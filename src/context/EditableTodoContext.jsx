import { createContext, useContext, useReducer } from "react";

export const EditableTodoContext = createContext(null);
export const EditableTodoDispatchContext = createContext(null);

const editableTodoReducer = (editableTodo, action) => {
    switch (action.type) {
        case 'edit': {
            return action.todos.find(element => element.id === action.id);
        }
        case 'reset': {
            return null;
        }
        default: return editableTodo;
    }
}

export const useEditableTodo = () => {
    return useContext(EditableTodoContext);
}

export const useEditableTodoDispatch = () => {
    return useContext(EditableTodoDispatchContext);
}

function EditableTodoProvider({ children }) {
    const [editableTodo, editableTodoDispatch] = useReducer(editableTodoReducer, null);
    return (
        <EditableTodoContext.Provider value={editableTodo}>
            <EditableTodoDispatchContext.Provider value={editableTodoDispatch}>
                {children}
            </EditableTodoDispatchContext.Provider>
        </EditableTodoContext.Provider>
    )
}
export default EditableTodoProvider;