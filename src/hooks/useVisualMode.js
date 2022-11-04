import React, {useState} from 'react' 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      const prevClone = [...prev];
      if (replace) {
        prevClone.pop();
      }
      return [...prevClone, newMode]
    });
  }

  const back = function() {
    if (history.length <= 1) {
      return;
    }
    setHistory(prev => prev.slice(0, prev.length - 1));
    setMode(history[history.length - 2]);
  }

  return { mode, history, transition, back };
}