import React from 'react';
import PropTypes from 'prop-types';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  console.log(file, write);
  return (
    <div className={css.editor}>
      <h3>TODO</h3>
      <i>text/markdown</i>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
