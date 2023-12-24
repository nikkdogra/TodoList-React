import { useEffect, useState } from 'react';
import './App.css'
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import List from './components/List';
import ModeContext from './context/ModeContext';
import EditableTodoProvider from './context/EditableTodoContext';
import TodosProvider, { useTodos } from './context/TodosContext';

function App() {
  const [filter, setFilter] = useState('all');

  const [mode, setMode] = useState('light');

  const onFilterTodos = (val) => {
    setFilter(val);
  }

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <div className='min-vh-100 py-3' style={{ background: mode === 'light' ? 'skyblue' : '#111' }}>
      {/* Mode */}
      <i className={`fa-solid ${mode === 'light' ? 'fa-sun text-primary' : 'fa-moon text-light'} position-fixed fs-1`} style={{ left: '3%', top: '3%', cursor: 'pointer' }} onClick={toggleMode}></i>

      <h1 className={`text-center text-${mode === 'light' ? 'primary' : 'light'} mb-1 mb-md-3`}>My To-Do List</h1>

      <div className={`${mode === 'light' ? 'bg-light text-primary' : 'bg-dark text-light'} col-10 col-md-6 mx-auto py-5 px-3 px-md-5`}>
        {/* Todos or TodosDispatch Provider */}
        <TodosProvider>
          {/* EditableTodo or EditableTodosDispatch */}
          <EditableTodoProvider>

            <AddTodo />

            <hr className={`text-${mode === 'light' ? 'primary' : 'light'} `} />

            <ModeContext.Provider value={mode}>
              {/* filter to filter todos */}
              <Filter onFilterTodos={onFilterTodos} filter={filter} />
              {/* todos list */}
              <List filter={filter} />

            </ModeContext.Provider>

          </EditableTodoProvider>

        </TodosProvider>
      </div>
    </div>
  )
}
export default App;


