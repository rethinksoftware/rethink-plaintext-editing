import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import css from './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-nextjs-toast';

function PlaintextEditor({ file, write }) {
  const currentRef = useRef();
  let [value, setValue] = useState('nothing yet');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = currentRef.current || {};

  useEffect(() => {
    // this block loads the existing file text or changed content
    (async () => {
      let changedTxt = localStorage.getItem(file.name);
      if (file.content) {
        setValue(file.content);
      } else if (changedTxt !== null) {
        setValue(changedTxt);
      } else {
        setValue(await file.text());
      }
    })();
    // this block initializes the ck editor instance on file change
    currentRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setEditorLoaded(true);
  }, [file]);

  const handleEditorChange = content => {
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
    setValue(' ');
  };

  // editor and save button
  return editorLoaded ? (
    <div className={css.editor}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onInit={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleEditorChange(data);
        }}
      />
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

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
