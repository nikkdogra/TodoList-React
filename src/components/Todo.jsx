import { useMode } from "../context/ModeContext";
import { useEditableTodoDispatch } from "../context/EditableTodoContext";
import { useTodos, useTodosDispatch } from "../context/TodosContext";

function Todo({ id, title, description, completed, pinned }) {
    const todos = useTodos();
    const todosDispatch = useTodosDispatch();
    const mode = useMode();
    const editableTodoDispatch = useEditableTodoDispatch();
    return (
    <div className="d-flex justify-content-between align-items-center my-3 py-2 px-4 position-relative" style={{ background: mode === 'light' ? 'lightblue' : '#333' }} onDoubleClick={() => todosDispatch({ type: 'pin', id: id })}>
            {pinned && <i className="fa-solid fa-thumbtack text-secondary position-absolute fs-5" style={{top: '3%', right: '1%'}}></i>}
            
            <div className="w-75">
                <h3 className="text-success">{title}</h3>
                <p className={`text-${mode === 'light' ? 'secondary' : 'light'}`}>{description}</p>
            </div>
            <div className="fs-4">
                <i className={`fa-${completed ? 'solid' : 'regular'} fa-circle-check text-success`} style={{ cursor: 'pointer' }} onClick={() => todosDispatch({ type: 'complete', id: id })}></i>
                <i className="fa-regular fa-pen-to-square mx-3 text-primary" style={{ cursor: 'pointer' }} onClick={() => editableTodoDispatch({type: 'edit',id: id, todos: todos})}></i>
                <i className="fa-solid fa-trash-can text-danger" style={{ cursor: 'pointer' }} onClick={() => todosDispatch({ type: 'delete', id: id })}></i>
            </div>
        </div>
    );
}
export default Todo;
