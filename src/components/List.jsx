import Todo from "./Todo";

function List({ todos, onDeleteTodo, onCompleteTodo, on_Edit_Icon_Click, filter, mode, onPinTodo }) {
    const generateTodos = (element) => {
        return <Todo key={element.id} id={element.id} title={element.title} description={element.description} completed={element.completed} pinned={element.pinned} onDeleteTodo={onDeleteTodo} onCompleteTodo={onCompleteTodo} on_Edit_Icon_Click={on_Edit_Icon_Click} mode={mode} onPinTodo={onPinTodo}/>
    }
    const filterTodos = () => {
        switch (filter) {
            case 'all': {
                const todosArr = todos.map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-3 mt-4">No Todo Available!</p>
            }
            case 'completed': {
                const todosArr = todos.filter(element => element.completed).map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-3 mt-4">No Completed Todo Available!</p>
            }
            case 'incomplete': {
                const todosArr = todos.filter(element => element.completed === false).map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-3 mt-4">No Incomplete Todo Available!</p>
            }
        }
    }
    return (
        <div>
            {/* rendring list of todos according to filter*/}
            {filterTodos()}
        </div>
    );
}
export default List;