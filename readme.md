# Rethink Plaintext Editing

This is our frontend coding challenge. It gives us a chance to see your abilities and how you approach problems. It is designed to give you unlimited creative freedom as you develop a solution. Feel free to use any packages/tools/etc. you'd like to edit text as elegantly as possible. There are a variety of different file types to experiment with as you see fit.

To run the challenge:

- FORK this repo
- Download forked repo and run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

Once complete, please email us a link to your forked repo with clean, tested code. We will use Chrome to run it.

- Rethink Engineering

## Added Packages
Looking to integrate these packages to enhance the usability of the file editor.
- [react-markdown](https://www.npmjs.com/package/react-markdown)
- [react-simple-code-editor](https://www.npmjs.com/package/react-simple-code-editor)
  - [prismjs](https://www.npmjs.com/package/prismjs)
  - [remark-gfm](https://www.npmjs.com/package/remark-gfm)

### Enhancements
- [ ] Add file previews and edit mode
  - [x] JavaScript
  - [ ] other file types
- [ ] Add file type support
  - [x] JavaScript
  - [ ] other file types
- [ ] Allow file editing and preview switching via a button or clicking the "file"
  - [x] button
  - [ ] clicking the "file"
- [x] Update modified date after edit

### Incomplete
- Getting prismjs code highlights working
- Extending react-simple-code-editor for any supported file type
  - Removes need for a JSEditor
  - Implement a general purpose CodeEditor
- Deciding between autosave or save button
- Preview should ask user to save first
- Add styling to JSEditor
