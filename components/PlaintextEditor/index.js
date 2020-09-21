import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";

import css from "./style.css";

function PlaintextEditor({ file, write }) {

  const [text, setText] = useState("")

  useEffect(() => {
    file.text().then(res => setText(res))
  }, [file])


  return (
    <div className="editor">
      <h3>TODO</h3>
      <ContentEditable
        html={text}
        disabled={false}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => write(file, text)}>Save</button>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
