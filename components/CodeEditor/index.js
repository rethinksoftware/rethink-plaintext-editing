import React, { useState, useEffect } from 'react';
import {ControlledEditor as Editor}from '@monaco-editor/react';
import PropTypes from 'prop-types';
import path from 'path';
import css from './../../pages/style.module.css';

const FILETYPE_TO_LANGUAGE = {
  "text/javascript" : 'javascript',
  "application/json" : 'json'
};

function CodeEditor({ file, write }) {
  const [fileString, setFileString] = useState('loading...');

  // load the file blob text
  // rerun the text load effect when the file prop changes
  useEffect(() => {
  	(async () => {
  	    setFileString(await file.text());
  	})();
  }, [file]);

  const onEdit = (e, newFileValue) => {
  	setFileString(newFileValue); 
	  write(new File([newFileValue], file.name, {
	    lastModified: Date.now(),
	    type: file.type
    }));
  }
  
  return (
    <div className={css.editor}>
      <h5  className={css.title}>{path.basename(file.name)}</h5 >
      <Editor
        value={fileString}
        language={FILETYPE_TO_LANGUAGE[file.type]}
        onChange={onEdit}
        height="80vh"
      />
    </div>
  );
}

CodeEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default CodeEditor;
