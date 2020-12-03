import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import {ControlledEditor as Editor}from '@monaco-editor/react';
import css from './../../pages/style.module.css';

function Previewer({ file }) {
  const [fileString, setFileString] = useState('loading...');

  useEffect(() => {
    (async () => {
      setFileString(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)} - Preview</div>
      <div className={css.content}>
        <ReactMarkdown height="80vh">{fileString}</ReactMarkdown>
      </div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};


function MarkdownEditor({ file, write }) {
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
    <div>
      <div className={css.editor}>
        <h5 className={css.title}>{path.basename(file.name)}</h5>
        <div className={css.content}>
          <Editor
            value={fileString}
            height="80vh"
            language="markdown"
            onChange={onEdit}
            >
          </Editor>
          </div>
      </div>
      <div className={css.gridChild}>
      <Previewer file={file} />
    </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
