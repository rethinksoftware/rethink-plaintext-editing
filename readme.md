# Rethink Plaintext Editing

This is our frontend coding challenge. It gives us a chance to see your abilities and how you approach problems. It is designed to give you unlimited creative freedom as you develop a solution. Feel free to use any packages/tools/etc. you'd like to edit text as elegantly as possible. There are a variety of different file types to experiment with as you see fit.

To run the challenge:

- FORK this repo
- Download forked repo and run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

Once complete, please email us a link to your forked repo with clean, tested code. We will use Chrome to run it.

- Rethink Engineering

Review:
- Code previews do not render the code itself, only allows editing
- Upon initial render, tinymce persists the content between files because it was the same instance each time
* With more time, I would use a different editor library next time or create my own; the free version had many limitations
- In the future, I would like to add the option to add files
- Need to fix bug where when visiting different file extensions, the state gets cleared
* Most likely a problem with my setValue state functionality

Features:
- File data is saved locally and written to the files array
- Can preview the text
- Can edit appearance and styles of the text
