# Rethink Plaintext Editing

This is our frontend coding challenge. It gives us a chance to see your abilities and how you approach problems. It is designed to give you unlimited creative freedom as you develop a solution. Feel free to use any packages/tools/etc. you'd like to edit text as elegantly as possible. There are a variety of different file types to experiment with as you see fit.

To run the challenge:

- FORK this repo
- Download forked repo and run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

Once complete, please email us a link to your forked repo with clean, tested code. We will use Chrome to run it.

- Rethink Engineering



# Assumptions

The text editor MVP is used primarily on laptop/desktop to provide a user friendly way to edit various type of files. Functional requirements include the ability to read, edit, and save a file. Usability requirements include scrolling. Additional features to make it more user friendly such as syntax highlighter, find and replace, and file preview are appreciated but not required.

# Scope

Must have:

- Ability to edit text - Finished

- Syntax highlights depends on file type - In Progress

- Persist to local storage on file change - Complete, not tested

- Scrolling - Complete

Nice to have:

- Styling Editor - Complete

- Integration test - Not Started

- File Preview - In Progress, Needs styling to display alongside editor

- Find and replace - Not Started

Not in scope:

- Mobile Friendly

- Saving to database

- Version control of files


# Running in dev

- FORK this repo
- Download forked repo and run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

# Testing

Tests are written with [Jest](https://jestjs.io/) and [React-Test-Library](https://testing-library.com/docs/react-testing-library/intro/)
- save text files in format of file_to_text.test.js under each Module to test
- npm run test

# Styling Libraries Used
 [React-Monaco-Editor](https://github.com/react-monaco-editor/react-monaco-editor) for editor syntax highlights
 [React-Mark-Down](https://github.com/remarkjs/react-markdown) for Markdown preview syntax highlights

# Bugs/Todo
 (in addition to scope)
 - Update timestamp on editing file: right now have to click other files/refresh to see updated date
