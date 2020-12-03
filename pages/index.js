import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';

import { listFiles } from '../files';

import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';
// import CodeEditor from '../components/CodeEditor';


import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
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
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <h5 className={css.title}>{path.basename(file.name)}</h5>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
  // "text/javascript" : CodeEditor,
  // "application/json" : CodeEditor
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    const files = listFiles();
    let cachedFiles = JSON.parse(localStorage.getItem("files"));
    //use files provided if no cache
    if(cachedFiles == null || cachedFiles.length == 0)
    {
      setFiles(files);
    } else {
      // update lastModified time from local storage 
      let newFiles = files.map(file => {
        const fileIndex = cachedFiles.findIndex(f => f.name === file.name);
        
        if (fileIndex!=-1){
          var cachedFile = cachedFiles[fileIndex];
          var updatedFile = new File(
            [cachedFile.content],
            file.name,
            {
              type : cachedFile.type,
              lastModified : cachedFile.lastModified
            }
          );
          return updatedFile;
        }  
        return file;
      });
      //update state
      setFiles(newFiles);
    }
  }, []);

  const write = async(file) => {
    //update state if file exist, else add new file
    const fileIndex = files.findIndex(f => f.name === file.name);
    if (fileIndex === -1) {
      files.push(file);
      fileIndex = files.length - 1;
    } else {
      files[fileIndex] = file;
    }

    //update local storage if cache exist, else set local storage
    let cachedFiles = JSON.parse(localStorage.getItem('files'));
    let updatedFile =  {
      name : file.name,
      content : await file.text(),
      type : file.type,
      lastModified : file.lastModified
    }
    if(cachedFiles){
      cachedFiles[fileIndex] = updatedFile;
    } else {
      cachedFiles = [updatedFile]
    }
    localStorage.setItem("files", JSON.stringify(cachedFiles))
    console.log(cachedFiles)
    setFiles(files);
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
