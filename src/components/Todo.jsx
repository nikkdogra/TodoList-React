function Todo({id,title,description,completed,onDeleteTodo,onCompleteTodo,on_Edit_Icon_Click}) {
    return (
        <div className="d-flex justify-content-between align-items-center my-3 py-2 px-4" style={{ background: '#333' }}>
            <div className="w-75">
                <h3 className="text-success">{title}</h3>
                <p className="text-light">{description}</p>
            </div>
            <div className="fs-4">
                <i className={`fa-${completed ? 'solid' : 'regular'} fa-circle-check text-success`} style={{cursor: 'pointer'}} onClick={() => onCompleteTodo(id)}></i>
                <i className="fa-regular fa-pen-to-square mx-3 text-primary" style={{cursor: 'pointer'}} onClick={() => on_Edit_Icon_Click(id)}></i>
                <i className="fa-solid fa-trash-can text-danger" style={{cursor: 'pointer'}} onClick={() => onDeleteTodo(id)}></i>
            </div>
        </div>
    );
}
export default Todo;