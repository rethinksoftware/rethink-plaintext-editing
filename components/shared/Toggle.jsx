import React from 'react';
import PropTypes from 'prop-types';

function ToggleButton({editMode, setEditMode}) {
  return (
    <button onClick={() => setEditMode(!editMode)}>{editMode ? "Preview" : "Edit"}</button>
  );
}

ToggleButton.propTypes = {
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
}

export default ToggleButton;
