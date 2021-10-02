import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(!replace){
      setMode(newMode);
      history.push(newMode);
    }
    //if replace is true, replace last item in arr with newmode and don't arr.push
    const lastItem = (history.length)-1;
    history[lastItem] = newMode;
    setMode(newMode);
   
    
  }

  const back = () => {
    if(history.length >= 2) {
      const lastItem = (history.length)-1;
        //make new arr, slicing history array right before final item
      const newArr = history.slice(0, lastItem)

      //set history arr to new arr with last item removed
      setHistory(newArr);

        //set mode to last item in new arr
        const last = history[(lastItem-1)];
        setMode(last);
      }
  }

  return {mode, transition, back};
}