import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import css from '../PlaintextEditor/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

function PreviewEditor({ file, write }) {
  const currentRef = useRef();
  let [value, setValue] = useState('nothing yet');
  const [textLoaded, setTextLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { LiveEditor } = currentRef.current || {};
  useEffect(() => {
    (async () => {
      let changedTxt = localStorage.getItem(file.name);
      // first checks if there is file content, then checks the local storage
      // if both don't exist, the original text gets called
      if (file.content) {
        setValue(file.content);
      } else if (changedTxt !== null) {
        setValue(changedTxt);
      } else {
        let initText = await file.text();
        setValue(initText);
      }
      setTextLoaded(true);
    })();
    currentRef.current = {
      LiveEditor: require('react-live').LiveEditor
    };
    setEditorLoaded(true);
  }, [file]);

  const handleChange = content => {
    write(file, content);
    setValue(content);
  };

  // save button grabs the content from local storage and writes it to the file
  // the save button is mostly for the user to feel assured
  const handleSave = () => {
    // let changedTxt = localStorage.getItem(file.name);
    write(file, value);
    toast.notify('', {
      duration: 2,
      type: 'success',
      title: '🦄 Saved!'
    });
  };

  const clearCurrent = () => {
    setValue('');
  };

  // this block creates usable code for the preview
  const usableCode = codeText => {
    let length = codeText.length;
    if (codeText.substring(0, 4) === '<p>') {
      return codeText.substring(3, length - 3);
    } else {
      return codeText;
    }
  };
  // editor and save button
  return editorLoaded && textLoaded ? (
    <div className={css.editor}>
      <LiveProvider code={usableCode(value)}>
        <LiveEditor onChange={handleChange} className={css.editor} />
        <LivePreview />
        <LiveError />
      </LiveProvider>
      <br />
      <ToastContainer />
      <div className={css.buttons}>
        <Button className={css.delete} variant="danger" onClick={clearCurrent}>
          Clear
        </Button>
        <Button className={css.save} variant="success" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  ) : (
    <img src="https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" />
  );
}

PreviewEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PreviewEditor;
