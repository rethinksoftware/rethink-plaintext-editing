import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import css from '../MarkdownEditor/style.css';

function PlaintextEditor({ file, write }) {
  let [value, setValue] = useState("nothing yet");
  // this next block currently only renders on refresh
  // problem with tinymce and react functional components creating one text editor instance
  useEffect(() => {
    (async () => {
      let fileText = await file.text()
      setValue(fileText);
    })();
    console.log('changed')
  }, [file.name]);

  const handleEditorChange = (content) => {
    console.log('Content was updated:', content);
    write(file, content);
    setValue(content)
  };

  return (
    <div className={css.editor}>
      <Editor
        // API KEY is currently exposed, fix later!
        apiKey="4h9kebmx706bddhgtwvn6i7osr50p6p7e0pva2pce8ou2voq"
        initialValue={localStorage.getItem(file.name)|| value}
        id={file.name + 'Editor'}
        // content= {localStorage.getItem(file.name)}
        init={{
          height: 500,
          menubar: "tools",
          plugins: 'code',
          plugin_preview_height: 500,
          toolbar:
            ['code',
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help']
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
