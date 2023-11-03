import { useState } from 'react'
import './App.css'

function App() {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]) as any[];

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodo(event.target.value);
  }

  const addEntry = () => {
    setToDos(todo);
    setShow(false);
  }

  const deleteToDo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const setToDos = (todo: string) => {
    setTodos([...todos, {id: todos.length, value: todo}]);
  }

  const onClickShowEntry = () => {
    setShow(true);
  }

  const onClickCancel = () => {
    setShow(false);
  }

  return (
    <>
      <h1>TODO List</h1>
      <div>
        {show ? (
          <div className="modal">
            <h2>新規登録</h2>
            <InputForm type="text" value={todo} onChange={onChangeText}/>
            <button onClick={addEntry}>追加</button>
            <button onClick={onClickCancel}>キャンセル</button>
          </div>
        ) : null}
      </div>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.value}<button onClick={() => deleteToDo(todo.id)}>x</button></li>
        })}
      </ul>
      <button onClick={onClickShowEntry}>
        +
      </button>
    </>
  )
}

const InputForm = (props) => {
  return (
    <input type="text" value={props.todo} onChange={props.onChange}/>
  );
}

export default App
