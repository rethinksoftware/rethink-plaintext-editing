import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import PlaintextEditor from '../components/PlaintextEditor';

function MarkdownEditor({ file, write }) {
  console.log(file, write)
  const [currText, setText] = useState(null);
  const ReactMarkdown = require('react-markdown')
  const gfm = require('remark-gfm')

  useEffect(() => {
    file.text().then((value)=>{
      setText(value);
    });
  }, []);

  useEffect(() => {
    file.text().then((value)=>{
      if (file.type === "text/javascript" ){
        value = "```js"+value+"\n```";
      }
      if (file.type === "application/json" ){
        value = "```json\n"+value+"\n```";
      }
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

  return (
    <div className={css.editor}>
      <div className={css.textArea}>
        <PlaintextEditor file={file} write={write}></PlaintextEditor>
        <ReactMarkdown plugins={[gfm]} children={currText} />
      </div>
    </div>
  );
}


MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
