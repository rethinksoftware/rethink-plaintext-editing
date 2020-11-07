import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import css from './style.css';


function JSEditor({ file, write }) {
  const [text, setText] = useState('');

  const saveFile = (text) => {
    setText(text);
    write(file, text);
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
        highlight={text => highlight(text, languages.js)}
        padding={10}
      />
      <button onClick={() => saveFile(text)}>Save</button>
    </div>
  );

}

JSEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default JSEditor;
