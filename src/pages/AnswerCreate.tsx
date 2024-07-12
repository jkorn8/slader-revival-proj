import React from 'react';
import Editor from '@monaco-editor/react';

const AnswerCreate: React.FC = () => {
  return (
    <div>
      <h1>Monaco Editor Test</h1>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme='vs-dark'
        language='javascript'/>
    </div>
  );
}

export default AnswerCreate;
