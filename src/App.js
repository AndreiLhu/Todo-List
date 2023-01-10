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

  const handleTodoSubmit = () => {
    setTodos([...todos, todo]);
    setTodo((prevState) => ({ ...prevState, description: '' }));
  };

  let tableHeaders = Object.keys(todo);
  tableHeaders.push('remove');

  const removeTodo = (e) => {
    setTodos([...todos].filter((s) => s.id !== e.id));
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Todo List</h1>
        <input value={todo.description} onChange={handleTodoOnChange} />
        <button onClick={handleTodoSubmit}>Add Todo</button>
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
              <td> {e.is_done ? 'completed' : 'not complete'} </td>
              <td onClick={() => removeTodo(e)}> x </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
