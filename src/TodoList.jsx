import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TodoList() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(0);

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={() => {
        tasksDispatch({
          type: 'add',
          id: nextId,
          name: input,
        });
        setInput('');
        setNextId(nextId + 1)
      }}>
        Add
      </button>

      {
        tasks.map(task => {
          return (
            <Todo id={task.id} name={task.name} tasksDispatch={tasksDispatch} key={task.id}/>
          )
        })
      }
    </div>
  )
}

function Todo({ id, name, tasksDispatch }) {
  const [edit, setEdit] = useState(false)

  return (
    <div>
      <input type='checkbox'/>
      {edit ? (
        <input
          value={name}
          onChange={e => tasksDispatch({
            type: 'edit',
            id: id,
            name: e.target.value,
          }
        )}/>
      ) : (
        name
      )}
      {' '}
      
      <button onClick={() => {
        setEdit(!edit);
      }}>
        {edit ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => {
        tasksDispatch({
          type: 'delete',
          id: id
        })
      }}>
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