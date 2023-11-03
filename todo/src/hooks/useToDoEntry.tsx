import { useState } from 'react';

const useToDoEntry = () => {
  const [show, setShow] = useState(false);

  const openToDoEntry = () => {
    setShow(true)
  };

  const createToDo = () => {
    setShow(false);
  }

  const cancel = () => {
    setShow(false);
  };

  const ToDoEntry = ({children}) => {
    if (!show) return null;

    return (
      <>
      <h2>新規登録</h2>
        {children}
        <button onClick={createToDo}>追加</button>
        <button onClick={cancel} >キャンセル</button>
      </>
    );
  };
  return { ToDoEntry, openToDoEntry }
}

export default useToDoEntry;
