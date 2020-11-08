import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import ToggleButton from './Toggle';
import css from './style.css';

function Previewer({ file, setEditMode }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
      <ToggleButton editMode={false} setEditMode={setEditMode} />
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object,
  setEditMode: PropTypes.func
};

export default Previewer;
