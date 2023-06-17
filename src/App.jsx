import { TodoList } from './TodoList.jsx'
import './App.css'

function App() {
  let initialTasks = localStorage.getItem('tasks');
  if(initialTasks) {
    initialTasks = JSON.parse(initialTasks);
  } else {
    initialTasks = [];
  }
  initialTasks = initialTasks.map((task, i) => {
    return {
      ...task,
      id: i,
    }
  });

  return (
    <>
      <h1>My Todo List</h1>
      <TodoList initialTasks={initialTasks} key={initialTasks}/>
    </>
  )
}

export default App
