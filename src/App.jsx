import { useEffect, useState } from 'react';
import './App.css'
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const findTodosOnLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
      return todos;
    }else{
      return [];
    }
  }
  const [todos,setTodos] = useState(findTodosOnLocalStorage());
  const [editableTodo,setEditableTodo] = useState(null);
  const [filter,setFilter] = useState('all');
  // add todo on todos
  const onAddTodo = ({title,description}) => {
    const todo = todos.find(element => element.title === title);
    // Check if the todo with the same title is already in the todos
    if(todo){
      alert(`Task with title '${title}' already available in the list`);
      return;
    }
    setTodos([...todos,{title: title,description: description,id: uuidv4(),completed: false}]);
  }
  // delete todo from todos
  const onDeleteTodo = (id) => {
    setTodos(todos.filter(element => element.id !== id));
  }
  const onCompleteTodo = (id) => {
    setTodos(todos.map(element => {
      if(element.id === id){
        return {...element,completed: !element.completed};
      }else{
        return element;
      }
    }));
  }
  const on_Edit_Icon_Click = (id) => {
    setEditableTodo(todos.find(element => element.id === id));
  }
  const onUpdateTodo = ({title,description}) => {
    setTodos(todos.map(element => {
      if(element.id === editableTodo.id){
        return {...editableTodo,title: title, description: description};
      }else{
        return element;
      }
    }));
    setEditableTodo(null);
  }
  const onFilterTodos = (val) => {
    setFilter(val);
  }
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]);
  return (
    <div className='min-vh-100 py-3' style={{ background: '#111' }}>
      <h1 className='text-center text-light mb-3'>My To-Do List</h1>
      <div className='bg-dark text-light w-50 mx-auto p-5'>
        <AddTodo onAddTodo={onAddTodo} editableTodo={editableTodo} onUpdateTodo={onUpdateTodo}/>
        <hr className='text-light' />
        <Filter onFilterTodos={onFilterTodos} filter={filter}/>
        <List todos={todos} onDeleteTodo={onDeleteTodo} onCompleteTodo={onCompleteTodo} on_Edit_Icon_Click={on_Edit_Icon_Click} filter={filter}/>
      </div>
    </div>
  )
}
export default App;