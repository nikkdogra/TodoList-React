import { useEffect, useState } from "react";

function AddTodo({onAddTodo,editableTodo,onUpdateTodo}) {
    const [todo, setTodo] = useState({ title: '', description: '' });
    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!todo.title,!todo.description){
            alert("Inputs Can't be Blank!")
            return;
        }

        if(editableTodo){
            onUpdateTodo(todo);
        }else{
            onAddTodo(todo);
        }
        setTodo({title: '',description: ''});
    }
    useEffect(() => {
        if(editableTodo){
            setTodo(editableTodo);
        }
    },[editableTodo]);
    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title: </label>
                    <input type="text" className="form-control" id="title" placeholder="Enter Title Of Your Todo" name="title" value={todo.title} onChange={handleChange} autoComplete="off" spellCheck='false'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description: </label>
                    <input type="text" className="form-control" id="description" placeholder="Enter Description Of Your Todo" name="description" value={todo.description} onChange={handleChange} autoComplete="off" spellCheck='false'/>
                </div>
                <button type="submit" className="btn btn-success py-1 px-3 fs-5 mt-3">{editableTodo ? 'Edit' : 'Add'}</button>
            </div>
        </form>
    )
}
export default AddTodo;