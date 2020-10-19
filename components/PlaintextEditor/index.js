import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';

export default function PlaintextEditor({ file, write, setActiveFileContent }) {
  const currentRef = useRef();
  const [retrievedContent, setRetrievedContent] = useState(false);
  let [value, setValue] = useState('');
  const { CKEditor, ClassicEditor } = currentRef.current || {};

  useEffect(() => {
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
    currentRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setRetrievedContent(true);
  }, [file]);

  const setText = content => {
    write(file, content);
    setValue(content);
    setActiveFileContent(content);
  };

  return retrievedContent ? (
    <div className={css.editor}>
      <div >
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onInit={editor => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
    </div>
  ) : null;
}
