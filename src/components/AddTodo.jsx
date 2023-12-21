import { useEffect, useState } from "react";
import { useTodosDispatch } from "../context/TodosContext";
import { useEditableTodo, useEditableTodoDispatch } from "../context/EditableTodoContext";


function AddTodo({ }) {
    const todosDispatch = useTodosDispatch();
    const editableTodo = useEditableTodo();
    const editableTodoDispatch = useEditableTodoDispatch();
    const [todo, setTodo] = useState({ title: '', description: '' });
    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.title, !todo.description) {
            alert("Inputs Can't be Blank!")
            return;
        }
        if (editableTodo) {
            todosDispatch({ type: 'update', title: todo.title, description: todo.description, id: editableTodo.id });
            editableTodoDispatch({type: 'reset'});
        } else {
            todosDispatch({ type: 'add', title: todo.title, description: todo.description });
        }
        setTodo({ title: '', description: '' });
    }
    useEffect(() => {
        if (editableTodo) {
            setTodo(editableTodo);
        }
    }, [editableTodo]);
    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title: </label>
                    <input type="text" className="form-control" id="title" placeholder="Enter Title Of Your Todo" name="title" value={todo.title} onChange={handleChange} autoComplete="off" spellCheck='false' />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description: </label>
                    <input type="text" className="form-control" id="description" placeholder="Enter Description Of Your Todo" name="description" value={todo.description} onChange={handleChange} autoComplete="off" spellCheck='false' />
                </div>
                <button type="submit" className="btn btn-success py-1 px-3 fs-5 mt-3">{editableTodo ? 'Edit' : 'Add'}</button>
            </div>
        </form>
    )
}
export default AddTodo;