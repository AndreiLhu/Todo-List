import './App.css';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

function App() {
  const id = uuidv1();
  const [todo, setTodo] = useState({
    id: '',
    description: '',
    is_done: false,
    // add deadline field
  });

  const [todos, setTodos] = useState([]);

  const handleTodoOnChange = (e) => {
    setTodo((prevState) => ({
      ...prevState,
      id: id,
      description: e.target.value,
    }));
  };

  let tableHeaders = Object.keys(todo);
  tableHeaders.push('remove');

  const removeTodo = (e) => {
    setTodos([...todos].filter((s) => s.id !== e.id));
  };

  const markAsDone = (e) => {
    setTodos(
      [...todos].map((s) => {
        if (s.id === e.id) {
          s.is_done = !s.is_done;
        }
        return s;
      })
    );
  };
  const handleTodoSubmit = () => {
    if (todo.description.length) {
      setTodos([...todos, todo]);
      setTodo((prevState) => ({ ...prevState, description: '' }));
    } else {
      alert('Please write the todo description!');
    }
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Todo List</h1>
        <input
          value={todo.description}
          onChange={handleTodoOnChange}
          className="inputfield"
        />
        <button onClick={handleTodoSubmit} className="buttonfield">
          Add Todo
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((e, i) => (
              <th key={i}> {e} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.map((e, i) => (
            <tr>
              <td> {e.id.split('-')[0]} </td>
              <td> {e.description} </td>
              <td onClick={() => markAsDone(e)}>
                {e.is_done ? ' done ' : 'not done'}{' '}
              </td>
              <td onClick={() => removeTodo(e)}> x </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
