import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMde from "react-mde";
import * as Showdown from "showdown";

import css from "./style.css";

function MarkdownEditor({ file, write }) {

  const [text, setText] = useState("")
  const [selectedTab, setSelectedTab] = useState("write");


  useEffect(() => {
    file.text().then(res => setText(res))
  }, [file])

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  const renderEditor = () => {
    return (
      <ReactMde
        value={text}
        onChange={setText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    )
  }

  return (
    <div className="editor">
      <h3>TODO</h3>
      <div className="container">
        {text && renderEditor()}
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
