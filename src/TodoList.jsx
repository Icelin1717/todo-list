import { useState, useReducer } from 'react'
import './App.css'

export function TodoList() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(0);

  function handleAddTask() {
    tasksDispatch({
      type: 'add',
      id: nextId,
      name: input,
    });
    setInput('');
    setNextId(nextId + 1);
  }
  
  function handleEdit(id, name) {
    tasksDispatch({
      type: 'edit',
      id: id,
      name: name,
    });
  }

  function handleDelete(id) {
    tasksDispatch({
      type: 'delete',
      id: id
    });
  }
  
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={() => handleAddTask()}>
        Add
      </button>

      {
        tasks.map(task => {
          return (
            <Todo id={task.id} name={task.name} handleEdit={handleEdit} handleDelete={handleDelete} key={task.id}/>
          )
        })
      }
    </div>
  )
}

function Todo({ id, name, handleEdit, handleDelete }) {
  const [edit, setEdit] = useState(false)

  return (
    <div>
      <input type='checkbox'/>
      {edit ? (
        <input
          value={name}
          onChange={e => handleEdit(id, e.target.value)}/>
      ) : (
        name
      )}
      {' '}
      
      <button onClick={() => {
        setEdit(!edit);
      }}>
        {edit ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  )
}

function taskReducer(tasks, action) {
  switch(action.type) {

    case 'add': {
      return [
        ...tasks,
        {
          id: action.id,
          name: action.name,
        }
      ]
    };

    case 'delete': {
      return tasks.filter(task => {
        return task.id !== action.id; 
      });
    }

    case 'edit': {
      return tasks.map(task => {
        if(task.id === action.id) {
          return {
            id: task.id,
            name: action.name,
          };
        } else {
          return task;
        }
      })
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}