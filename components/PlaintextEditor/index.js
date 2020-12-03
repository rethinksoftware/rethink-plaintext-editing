import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import {ControlledEditor as Editor } from '@monaco-editor/react';
import css from './../../pages/style.module.css';

function PlaintextEditor({ file, write }) {
  const [fileString, setFileString] = useState('loading...');

  // load the file blob text
  // rerun the text load effect when the file prop changes
  useEffect(() => {
    (async () => {
        setFileString(await file.text());
    })();
  }, [file]); 

  //handle file text change
  const onEdit = (e, newFileValue) => {
    setFileString(newFileValue); 
    write(new File([newFileValue], file.name, {
      lastModified: Date.now(),
      type: file.type
    }));
  }

  return (
    <div className={css.editor}>
      <h5 className={css.title}>{path.basename(file.name)}</h5>

      <Editor
        value={fileString}
        height="80vh"
        width='100%'
        language="plaintext"
        onChange={onEdit}
        >
      </Editor>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
