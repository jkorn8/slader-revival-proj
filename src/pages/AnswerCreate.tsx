import './AnswerCreate.css';
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Editor, Monaco } from '@monaco-editor/react';
import { editor, Position, languages } from 'monaco-editor';
import * as monacoLatex from 'monaco-latex';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { useAuth } from '../context/AuthContext';
import { solutionPost, textbookGet } from '../apiCalls/apiCalls';
import Textbook from '../types/Textbook';

interface LatexEditorProps {
  latexCode: string | undefined;
  setLatexCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AnswerCreate: React.FC = () => {

  const { authState } = useAuth();
  const { state } = useLocation();
  const { textbookId } = useParams();
  const navigate = useNavigate();

  const { chapter: initialChapter, section: initialSection, problem: initialProblem } = state ?? {};

  // TODO: save latex code on reload
  const [latexCode, setLatexCode] = useState<string | undefined>('% Type your LaTeX code here');
  const [mode, setMode] = useState<string>('editor');

  // TODO: globalize this method of setting chapter/section/problem across the app
  const [textbook, setTextbook] = useState<Textbook | undefined>(undefined);
  const [chapter, setChapter] = useState<number>(parseInt(initialChapter) || 0);
  const [section, setSection] = useState<number>(parseInt(initialSection) || 0);
  const [problem, setProblem] = useState<number>(parseInt(initialProblem) || 0);

  useEffect(() => {
    textbookGet(textbookId || '-1').then((textbook) => {
      setTextbook(textbook);
    }).catch((e) => {
      console.log(e);
      setTextbook(undefined);
    });
  }, []);

  if (!authState || authState.authenticated === null) {
    return <></>;
  }

  if (authState.authenticated === false) {
    console.log(authState);
    return <Navigate to="/login" replace={true} />
  }

  const handlePostSolution = () => {
    const missingField = !textbookId ? 'Textbook ID' : !chapter ? 'Chapter' : !section ? 'Section' : !problem ? 'Problem' : null;
    if (missingField) {
      alert(`Missing or invalid: ${missingField}`);
      return;
    }

    solutionPost(textbookId!, chapter!, section!, problem!, latexCode!).then((success: boolean) => {
      if (success) {
        navigate(`/solutions/${textbookId}/${chapter}/${section}/${problem}`);
        alert('Solution posted successfully!');
      }
      else {
        alert('Failed to post solution');
      }
    });
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Post a Solution</h1>
      <div style={{ display: 'flex', flexDirection: 'row', width: 'calc(100% - 48px)' }}>
        <select
          defaultValue={0}
          value={chapter}
          onChange={(e) => {
            setChapter(parseInt(e.target.value));
            setSection(0);
            setProblem(0);
          }}
        >
          <option value={0}>Select a chapter...</option>
          {textbook?.chapters.map((chapter, i) => <option value={i + 1}>{chapter}</option>)}
        </select>
        <select
          defaultValue={0}
          value={section}
          disabled={chapter === 0}
          onChange={(e) => {
            setSection(parseInt(e.target.value));
            setProblem(0);
          }}
        >
          <option value={0}>Select a section...</option>
          {chapter !== 0 ? textbook?.sections[chapter - 1].map((section, i) => <option value={i + 1}>{section}</option>) : null}
        </select>
        <select
          defaultValue={0}
          value={problem}
          onChange={(e) => setProblem(parseInt(e.target.value))}
          disabled={chapter === 0 || section === 0}
        >
          <option value={0}>Select a problem...</option>
          {[1, 2, 3, 4, 5].map((problem) => <option value={problem}>{`Problem ${problem}`}</option>)}
        </select>
      </div>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <button className='buttonGroup' disabled={mode === 'editor'} onClick={() => setMode('editor')}>
            LaTeX Editor
          </button>
          <button className='buttonGroup' disabled={mode === 'steps'} onClick={() => setMode('steps')}>
            Step by Step
          </button>
          <button className='buttonGroup' disabled={mode === 'screenshots'} onClick={() => setMode('screenshots')}>
            Upload Screenshots
          </button>
        </div>
      </div>
      {mode === 'editor' ? <LatexEditor latexCode={latexCode} setLatexCode={setLatexCode} /> : mode === 'steps' ? <StepByStep /> : <UploadScreenshots />}
      {mode === 'editor' ? <button onClick={handlePostSolution}>Post Solution!</button> : null}
    </div>
  );
}

const LatexEditor: React.FC<LatexEditorProps> = ({ latexCode, setLatexCode }) => {
  const keywords = monacoLatex.default.builtin.map((keyword: string) => `\\${keyword}`);

  const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monaco.languages.register({ id: 'latex' });
    monaco.languages.setMonarchTokensProvider('latex', monacoLatex.default);

    const provideCompletionItems = (model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: any) => {
      const suggestions = [
        ...keywords.map((word: string) => {
          const range = {
            startLineNumber: position.lineNumber,
            startColumn: position.column - (model.getWordUntilPosition(position) ? model.getWordUntilPosition(position)!.word.length : 0),
            endLineNumber: position.lineNumber,
            endColumn: position.column
          }

          return {
            range: range,
            label: word,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: word.substring(1),
          }
        })
      ];
      return { suggestions: suggestions };
    }

    monaco.editor.defineTheme('latexTheme', {
      base: 'vs-dark',
      rules: [
        { token: 'keyword', foreground: 'f33969', fontStyle: 'bold' },
        { token: 'comment', foreground: '39ff14', fontStyle: 'italic' },
        { token: 'delimiter', foreground: '69e8ce' },
        { token: 'string', foreground: 'ffff00' },
      ],
      inherit: true,
      colors: {}
    });
    monaco.editor.setTheme('latexTheme');

    monaco.languages.registerCompletionItemProvider('latex', {
      provideCompletionItems: provideCompletionItems,
      triggerCharacters: ["\\"]
    });

    // monaco.editor.setModelMarkers(editor.getModel()!, 'owner', [{
    //   startLineNumber: 1,
    //   endLineNumber: 1,
    //   startColumn: 1,
    //   endColumn: 100,
    //   message: 'This is a test',
    //   severity: monaco.MarkerSeverity.Error
    // }])
  }


  return (
    <MathJaxContext>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100vw', height: '80vh' }}>
        <div style={{ width: '50vw', height: '80vh' }}>
          <Editor
            height="80vh"
            language='latex'
            theme='vs-dark'
            options={{ "minimap": { enabled: false } }}
            onMount={onMount}
            value={latexCode || ''}
            onChange={(value: string | undefined) => setLatexCode(value)}
          />
        </div>
        <div style={{ backgroundColor: '', width: '50vw', height: '80vh', padding: 10 }}>
          <MathJax>{latexCode || ''}</MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
}

// TODO: implement
const StepByStep = () => {
  return (
    <div>
      <h1>
        Coming Soon...
      </h1>
    </div>
  );
}

// TODO: implement
const UploadScreenshots = () => {
  return (
    <div>
      <h1>
        Coming Soon...
      </h1>
    </div>
  );
}

export default AnswerCreate;
