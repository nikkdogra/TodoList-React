import { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const TodosContext = createContext(null);
const TodosDispatchContext = createContext(null);

function todosReducer(todos, action) {
    switch (action.type) {
        case 'add': {
            if (todos.find(element => element.title === action.title)) {
                alert(`Task with title '${action.title}' already available in the list`);
                return todos;
            }
            return [...todos, { title: action.title, description: action.description, id: uuidv4(), completed: false, pinned: false }];
        }
        case 'delete': {
            return todos.filter(element => element.id !== action.id);
        }
        case 'complete': {
            return todos.map(element => {
                if (element.id === action.id) {
                    return { ...element, completed: !element.completed };
                } else {
                    return element;
                }
            });
        }
        case 'update': {
            return todos.map(element => {
                if (element.id === action.id) {
                    return { ...element, title: action.title, description: action.description };
                } else {
                    return element;
                }
            });
        }
        case 'pin': {
            const todo = todos.find(element => element.id === action.id);
            if (todo.pinned) {
                return [...todos.filter(element => element.pinned && element.id !== todo.id), { ...todo, pinned: false }, ...todos.filter(element => !element.pinned)]
            } else {
                return [{ ...todo, pinned: true }, ...todos.filter(element => element.id !== todo.id)];
            }
        }
        default:
            return todos;
    }
}

function TodosProvider({ children }) {
    const findTodosOnLocalStorage = () => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            return todos;
        } else {
            return [];
        }
    }
    const [todos, todosDispatch] = useReducer(todosReducer, findTodosOnLocalStorage());

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={todosDispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    )
}
export const useTodos = () => {
    return useContext(TodosContext);
}
export const useTodosDispatch = () => {
    return useContext(TodosDispatchContext);
}
export default TodosProvider;