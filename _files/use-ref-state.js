import { useState, useRef, useEffect } from 'react';

// From: https://blog.castiel.me/posts/2019-02-19-react-hooks-get-current-state-back-to-the-future/

export default initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {

  return [state, stateRef, setState];
};
