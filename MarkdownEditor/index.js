import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from 'rich-markdown-editor';
import css from './style.css';

function MarkdownEditor({ file, write }) {
  // console.log(file, write);
  let [value, setValue] = useState("nothing yet");
  console.log(file)
  useEffect(() => {
    (async () => {
      // let fileText = await file.text()
      setValue(await file.text());
      // console.log(fileText)
    })();
    console.log('changed')
  }, [file.name]);

  const handleChange = (value) => {
    const text = value()
    write(file,text)
  }
  return (
    <div className={css.editor}>
      <Editor 
      defaultValue={localStorage.getItem(file.name) || value}
      onChange={handleChange}
      />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
