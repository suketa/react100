import './App.css'
import ToDoList from './ToDoList'
import useToDoEntry from './hooks/useToDoEntry'

function App() {
  const { ToDoEntry, openToDoEntry } = useToDoEntry();
  return (
    <>
      <h1>TODO List</h1>
      <ToDoList />
      <ToDoEntry />
      <button onClick={openToDoEntry}>
        +
      </button>
    </>
  )
}

export default App
