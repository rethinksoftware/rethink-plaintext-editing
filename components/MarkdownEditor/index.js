import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import css from '../PlaintextEditor/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-nextjs-toast';

function MarkdownEditor({ file, write }) {
  const currentRef = useRef();
  let [value, setValue] = useState('nothing yet');
  const [textLoaded, setTextLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { Editor } = currentRef.current || {};

  useEffect(() => {
    (async () => {
      let changedTxt = localStorage.getItem(file.name);
      // first checks if there is file content, then checks the local storage
      // if both don't exist, the original text gets called
      if (file.content) {
        setValue(file.content);
      } else if (changedTxt!==null) {
        setValue(changedTxt);
      } else {
        let initText = await file.text();
        setValue(initText);
      }
      setTextLoaded(true);
    })();
    currentRef.current = {
      Editor: require('rich-markdown-editor').default
    };
    setEditorLoaded(true);
  }, [file]);

  const handleChange = value => {
    const text = value();
    write(file, text);
  };
  

  // save button grabs the content from local storage and writes it to the file
  // the save button is mostly for the user to feel assured
  const handleSave = () => {
    let changedTxt = localStorage.getItem(file.name);
    write(file, changedTxt);
    toast.notify('', {
      duration: 2,
      type: 'success',
      title: '🦄 Saved!'
    });
  };

  return editorLoaded && textLoaded ? (
    <div className={css.editor}>
      <Editor defaultValue={value} value={value} onChange={handleChange} />
      <br />
      <ToastContainer />
      <div className={css.buttons}>
        <Button className={css.save} variant="success" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  ) : (
    <img src="https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" />
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
