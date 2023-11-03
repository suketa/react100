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
    setTodos([...todos, {id: crypto.randomUUID(), value: todo}]);
    setTodo('');
  }

  const onClickShowEntry = () => {
    setShow(true);
  }

  const onClickCancel = () => {
    setShow(false);
    setTodo('');
  }

  return (
    <div className="ToDoApp">
      <h1>TODO List</h1>
      <div>
        {show ?
          <ModalTodo
            value={todo}
            onChangeText={onChangeText}
            onClickaddEntry={addEntry}
            onClickCancel={onClickCancel}
          />
          : null}
      </div>
      <ToDoList todos={todos} onClickDelete={deleteToDo}/>
      <button className="button-show-entry" onClick={onClickShowEntry}>+</button>
    </div>
  )
}

const InputForm = ({value, onChange}) => {
  return (
    <input type="text" value={value} onChange={onChange}/>
  );
}

const ModalTodo = (props) => {
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h2>新規登録</h2>
        <InputForm type="text" value={props.value} onChange={props.onChangeText}/>
        <div className="button-group">
          <button onClick={props.onClickaddEntry}>追加</button>
          <button onClick={props.onClickCancel}>キャンセル</button>
        </div>
      </div>
    </div>
  )
}

const ToDoList = ({todos, onClickDelete}) => {
  return (
   <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input type="checkbox"/>
            <div className="todo-item">
              {todo.value}
            </div>
            <button className="button-delete" onClick={() => onClickDelete(todo.id)}>
              x
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default App
