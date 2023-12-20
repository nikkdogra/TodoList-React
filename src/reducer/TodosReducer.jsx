import { v4 as uuidv4 } from 'uuid';
function todosReducer(todos, action) {
    switch (action.type) {
        case 'add': {
            const todo = todos.find(element => element.title === action.title);
            if (todo) {
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
            if(todo.pinned){
                return [...todos.filter(element => element.pinned && element.id !== todo.id),{...todo,pinned: false},...todos.filter(element => !element.pinned)]
            }else{
                return [{...todo,pinned: true}, ...todos.filter(element => element.id !== todo.id)];
            }
        }
        default:
            return todos;
    }
}
export default todosReducer;

