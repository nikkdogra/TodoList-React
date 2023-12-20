import { useEffect, useReducer, useState } from 'react';
import './App.css'
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import List from './components/List';
import todosReducer from './reducer/TodosReducer';

function App() {
  const findTodosOnLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      return todos;
    } else {
      return [];
    }
  }
  const [todos, dispatch] = useReducer(todosReducer, findTodosOnLocalStorage());
  const [editableTodo, setEditableTodo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [mode, setMode] = useState('light');
  // add todo on todos
  const onAddTodo = ({ title, description }) => {
    dispatch({ type: 'add', title: title, description: description });
  }
  // delete todo from todos
  const onDeleteTodo = (id) => {
    dispatch({ type: 'delete', id: id });
  }
  const onCompleteTodo = (id) => {
    dispatch({ type: 'complete', id: id });
  }
  const on_Edit_Icon_Click = (id) => {
    setEditableTodo(todos.find(element => element.id === id));
  }
  const onUpdateTodo = ({ title, description }) => {
    dispatch({ type: 'update', title: title, description: description, id: editableTodo.id });
    setEditableTodo(null);
  }
  const onFilterTodos = (val) => {
    setFilter(val);
  }
  const onPinTodo = (id) => {
    dispatch({ type: 'pin', id: id });
  }
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className='min-vh-100 py-3' style={{ background: mode === 'light' ? 'skyblue' : '#111' }}>
      <i className={`fa-solid ${mode === 'light' ? 'fa-sun text-primary' : 'fa-moon text-light'} position-fixed fs-1`} style={{ left: '5%', top: '5%',cursor: 'pointer' }} onClick={toggleMode}></i>
      <h1 className={`text-center text-${mode === 'light' ? 'primary' : 'light'} mb-3`}>My To-Do List</h1>
      <div className={`${mode === 'light' ? 'bg-light text-primary' : 'bg-dark text-light'} w-50 mx-auto p-5`}>
        <AddTodo onAddTodo={onAddTodo} editableTodo={editableTodo} onUpdateTodo={onUpdateTodo} />
        <hr className='text-light' />
        <Filter onFilterTodos={onFilterTodos} filter={filter} mode={mode} />
        <List todos={todos} onDeleteTodo={onDeleteTodo} onCompleteTodo={onCompleteTodo} on_Edit_Icon_Click={on_Edit_Icon_Click} filter={filter} mode={mode} onPinTodo={onPinTodo} />
      </div>
    </div>
  )
}
export default App;
