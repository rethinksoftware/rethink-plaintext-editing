import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

function MarkdownEditor({ file, write }) {
  console.log(file, write)
  const [currText, setText] = useState(null);
  const ReactMarkdown = require('react-markdown')
  const gfm = require('remark-gfm')

  const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter language={language} children={value} />
    }
  }

  useEffect(() => {
    file.text().then((value)=>{
      setText(value);
    });
  }, [file]);

  let handleTextChange = (event) => {
    setText(event.target.value);

    let updatedFile = new File(
      [
        event.target.value
      ],
      file.name,
      {
        type: file.type,
        lastModified: Date.now()
      }
    );
    write(updatedFile)
  }

  function fileType(value) {
    if (file.type === "text/javascript" ){
      value = "```js\n"+value+"\n```";
    }
    if (file.type === "application/json" ){
      value = "```json\n"+value+"\n```";
    }
    return value
  }

  return (
    <div className={css.editor}>
      <h3>{file.name.substring(1)}</h3>
      <div className={css.textArea}>
        <textarea onChange={handleTextChange} className={css.textArea} value={currText?currText:""}/>
        <ReactMarkdown plugins={[gfm]} renderers={renderers} children={fileType(currText)} />
      </div>
    </div>
  );
}


MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
