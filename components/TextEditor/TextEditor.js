import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import ToggleButton from './Toggle';
import css from './style.css';

function TextEditor({ file, write, setEditMode}) {
  const [text, setText] = useState('');

  const saveFile = (text) => {
    setText(text);
    write(file, text);
  }

  const changeEditMode = (mode) => {
    saveFile(text);
    setEditMode(mode);
  }

  useEffect(() => {
    (async () => {
      setText(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.jsEditor}>
      <Editor
        value={text}
        onValueChange={text => setText(text)}
        highlight={text => text}
        padding={10}
      />
      <button onClick={() => saveFile(text)}>Save</button>
      <ToggleButton editMode={true} setEditMode={changeEditMode} />
    </div>
  );

}

TextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
  setEditMode: PropTypes.func
};

export default TextEditor;
