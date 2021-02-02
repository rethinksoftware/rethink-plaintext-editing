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
      <h3>{file.name.substring(1)}</h3>
      <textarea onChange={handleTextChange} className={css.textArea} value={currText?currText:""}/>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
