import React, { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import path from "path";
import classNames from "classnames";

import { listFiles } from "../lib/list-files";

// Used below, these need to be registered
import MarkdownEditor from "../MarkdownEditor";
import PlaintextEditor from "../components/PlaintextEditor";

import IconPlaintextSVG from "../public/icon-plaintext.svg";
import IconMarkdownSVG from "../public/icon-markdown.svg";
import IconJavaScriptSVG from "../public/icon-javascript.svg";
import IconJSONSVG from "../public/icon-json.svg";

import css from "./style.module.css";

const TYPE_TO_ICON = {
  "text/plain": IconPlaintextSVG,
  "text/markdown": IconMarkdownSVG,
  "text/javascript": IconJavaScriptSVG,
  "application/json": IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile, handleDate, handleName }) {

  const up = () => {
    let newIndex;
    if (!activeFile) {
      newIndex = files.length - 1
    }
    else {
      let index = files.indexOf(activeFile)
  
      newIndex = index - 1
      if (newIndex === -1) {
        newIndex = files.length - 1
      }
    }
    setActiveFile(files[newIndex])
  }
  
  const down = () => {
    let newIndex;
    if (!activeFile) {
      newIndex = 0;
    }
    else {
      let index = files.indexOf(activeFile)
      newIndex = index + 1
      if (newIndex === files.length) {
        newIndex = 0
      }
    }
    setActiveFile(files[newIndex])
  }

  return (
    <div className="files">

      <div className="buttons">
        <div className="up" onClick={() => up()}>
          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path></svg>
        </div>
        <div className="down" onClick={() => down()}>
          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path></svg>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th className="th_name" onClick={() => handleName()}>File</th>
            <th className="th_date" onClick={() => handleDate()}>Modified</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file, index) => (
            <tr
              key={file.name}
              className={classNames(
                "row",
                activeFile && activeFile.name === file.name ? "active" : ""
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className="file">
                <div
                  className="icon"
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

function Previewer({ file }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className="preview">
      <div className="title">{path.basename(file.name)}</div>
      <div className="content">{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};


// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
};


function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [dateDesc, setDateDescending] = useState(true)
  const [nameDesc, setNameDescending] = useState(false)

  const handleDate = () => {
    setDateDescending(!dateDesc)
    if (dateDesc) {
      files.sort((a, b) => a.lastModified - b.lastModified)
    }
    else {
      files.sort((a, b) => b.lastModified - a.lastModified)
    }
  }

  const handleName = () => {
    setNameDescending(!nameDesc)
    if (!nameDesc) {
      files.sort((a, b) => a.name.localeCompare(b.name))
    }
    else {
      files.sort((a, b) => b.name.localeCompare(a.name))
    }
  }

  useEffect(() => {
    const files = listFiles();

    //place unedited files into array
    let unchangedFiles = files.filter(file => !localStorage.getItem(file.name))

    //place edited files into array, and write new files with the edited text retrieved from local storage to replace the original.
    let editedFiles = files.filter(file => localStorage.getItem(file.name))
    let changedFiles = editedFiles.map(edited => rewrite(edited))

    //combine both arrays
    let updated = [...unchangedFiles, ...changedFiles]

    let sortedFiles = updated.sort((a,b) => b.lastModified - a.lastModified)
    setFiles(sortedFiles);
  }, []);

  const rewrite = (file) => {
    return new File(
      [localStorage.getItem(file.name)],
      file.name,
      {
        type: file.type,
        lastModified: file.lastModified
      }
    )
  }

  const write = (oldfile, text) => {
    console.log("Writing... ", oldfile.name, text);
    const name = oldfile.name
    const index = files.indexOf(oldfile)
    localStorage.setItem(name, text)

    const editedFile = rewrite(oldfile)

    files[index] = editedFile
    setFiles(files)
    // TODO: Write the file to the `files` array
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className="page">
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className="tagline">Rethink Engineering Challenge</div>
          <h1>Seasoning Plaintext</h1>
          <div className="description">
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          handleDate={handleDate}
          handleName={handleName}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className="link">
            <a href="https://rethink.software">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className="link">
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className="editorWindow">
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className="empty">Select a file to view or edit</div>
        )}

      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
