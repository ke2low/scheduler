import { useState } from 'react';

export const useVisualMode = (first) => {
  const [mode, setMode] = useState(first);
  const [history, setHistory] = useState([first]);

  const transition = (newMode, replace) => {
    if (replace === undefined) {
      setHistory([...history, newMode])
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length === 1) return;
    let hstory = history.slice(0, history.length - 1)
    setHistory([...hstory])
    setMode(history[history.length - 2])
  };

  return { mode, transition, back };
};