export function listFiles() {
  const guide = new File(
    [
      `The objective is to significantly improve this file browser. Features to think about include: a text editor, markdown and code previews, or file changes persisting across reloads.

Install any npm packages or use any third party code you'd like, but please make sure it is clear when you do so.

Once complete, send us a forked GitHub repo link.

Thanks for trying our challenge!

- Rethink Engineering
`
    ],
    '/README.txt',
    {
      type: 'text/plain',
      lastModified: new Date('2020-01-05T16:39:00')
    }
  );

  const plain = new File(
    ['Just some text looking for an editor'],
    '/plain.txt',
    {
      type: 'text/plain',
      lastModified: new Date('1995-12-17T03:24:00')
    }
  );

  const water = new File(
    [
      'Increasing water scarcity is an extremely dangerous symptom of a warming planet. The World Health Organization estimates that half of the global population will live in water-stressed areas by 2025. In 2008, the CEO of DOW Chemical said, “Water is the oil of the 21st century.” There have been 9 major conflicts over oil since 1932.'
    ],
    '/water.txt',
    {
      type: 'text/plain',
      lastModified: new Date('1998-12-17T04:24:00')
    }
  );

  // Here is a markdown file
  const fancy = new File(
    [
      `# Some Markdown that could be rendered and HTML

The *quick* brown fox, jumped **over** the lazy [dog](https://en.wikipedia.org/wiki/Dog).`
    ],
    '/fancy.md',
    {
      type: 'text/markdown',
      lastModified: new Date('2018-09-14T09:32:17')
    }
  );

  const javascript = new File(
    [
      `import { useState, useRef, useEffect } from 'react';

// From: https://blog.castiel.me/posts/2019-02-19-react-hooks-get-current-state-back-to-the-future/

export default initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [state, stateRef, setState];
};`
    ],
    '/use-ref-state.js',
    {
      type: 'text/javascript',
      lastModified: new Date('2019-04-01T12:15:01')
    }
  );

  const json = new File(
    [
      `{
    "name" : "Admin",
    "email" : "admin@neptune.com",
    "rights" : [ "admin", "editor", "contributor" ]
}`
    ],
    '/document.json',
    {
      type: 'application/json',
      lastModified: new Date('2011-07-29T16:01:35')
    }
  );

  return [guide, plain, water, fancy, javascript, json];
}
