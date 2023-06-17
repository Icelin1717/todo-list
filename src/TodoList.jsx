import { useState, useReducer } from 'react'

export function TodoList() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(0);

  function handleAdd() {
    if(input === '') return;
    tasksDispatch({
      type: 'add',
      id: nextId,
      name: input,
    });
    setInput('');
    setNextId(nextId + 1);
  }
  
  function handleEdit(id, name) {
    if(name === '') return;
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

  function handleCheck(id) {
    tasksDispatch({
      type: 'check',
      id: id
    })
  }
  
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={() => handleAdd()}>
        Add
      </button>

      {
        tasks.map(task => {
          return (
            <Todo task={task} handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} key={task.id}/>
          )
        })
      }
    </div>
  )
}

function Todo({ task, handleCheck, handleEdit, handleDelete }) {
  const [edit, setEdit] = useState(false)

  const id = task.id
  const name = task.name
  const checked = task.checked

  return (
    <div>
      <input  
        type='checkbox'
        checked={checked}
        onChange={() => handleCheck(id)}
        />
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
          checked: false,
        }
      ]
    };

    case 'check': {
      return tasks.map(task => {
        if(task.id === action.id) {
          return {
            id: task.id,
            name: task.name,
            checked: !task.checked,
          }
        } else {
          return task;
        }
      }) 
    }

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
            checked: task.checked,
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