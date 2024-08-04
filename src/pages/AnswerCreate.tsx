import React from 'react';
import { ButtonGroup, Button } from '@mui/material'
import { Editor, Monaco } from '@monaco-editor/react';
import { editor, Position, languages} from 'monaco-editor';
import * as monacoLatex from 'monaco-latex';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const AnswerCreate: React.FC = () => {

  const [latexCode, setLatexCode] = React.useState<string | undefined>('% Type your LaTeX code here');
  const keywords = monacoLatex.default.builtin.map((keyword: string) => `\\${keyword}`);

  const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monaco.languages.register({ id: 'latex'});
    monaco.languages.setMonarchTokensProvider('latex', monacoLatex.default);

    const provideCompletionItems = (model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: any) => {
      const suggestions = [
        ...keywords.map((word: string) => {
          const range = {
            startLineNumber: position.lineNumber,
            startColumn: position.column - (model.getWordUntilPosition(position)? model.getWordUntilPosition(position)!.word.length : 0),
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
        {token: 'keyword', foreground: 'f33969', fontStyle: 'bold'}, 
        {token: 'comment', foreground: '39ff14', fontStyle: 'italic'},
        {token: 'delimiter' , foreground: '69e8ce'},
        {token: 'string', foreground: 'ffff00'},
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
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ padding: '20px', alignItems: 'center', justifyContent: 'center', height: '10vh'}}>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button>LaTeX Editor</Button>
          <Button>Step by Step</Button>
          <Button>Upload Screenshots</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100vw' }}>
        <div style={{ width: '50vw', height: '80vh'}}>
          <Editor
            height="90vh"
            language='latex'
            theme='vs-dark'
            options={{ "minimap": { enabled: false }}}
            onMount={onMount}
            value={latexCode || ''}
            onChange={(value: string | undefined) => setLatexCode(value)}
          />
        </div>
        <div style={{ backgroundColor: '', width: '50vw', height: '80vh', padding: 10}}>   
          <MathJax>{latexCode || ''}</MathJax>
        </div>
      </div>
    </div>
    </MathJaxContext>
  );
}

export default AnswerCreate;
