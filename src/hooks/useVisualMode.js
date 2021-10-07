import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      const newHistory = (prev) => [...prev, newMode];
      setHistory(newHistory);
    }

    const lastItem = history.length - 1;
    const otherHistory = (prev) => [...prev];
    otherHistory[lastItem] = newMode;
    setMode(newMode);
  };

  const back = () => {
    if (history.length >= 2) {
      const lastItem = history.length - 1;
      const newArr = history.slice(0, lastItem);

      setHistory(newArr);

      const last = history[lastItem - 1];
      setMode(last);
    }
  };

  return { mode, transition, back };
}
