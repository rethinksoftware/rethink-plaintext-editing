import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import { listFiles } from '../../files';

function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [currText, setText] = useState(null);

  useEffect(() => {
    file.text().then((value)=>{
      setText(value);
    });
  }, []);

  useEffect(() => {
    file.text().then((value)=>{
      setText(value);
    });
  }, [file]);

  let handleTextChange = (text) => {
      setText(text);
      file.
      write(//make new file)
  }
  return (
    <div className={css.editor}>
      <h3>{file.name.substring(1)}</h3>
      <textarea contentEditable="true" onChange={handleTextChange} className={css.textArea} value={currText}/>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
