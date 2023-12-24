import { useTodos } from "../context/TodosContext";
import Todo from "./Todo";

function List({filter}) {
    const todos = useTodos();
    const generateTodos = (element) => {
        return <Todo key={element.id} id={element.id} title={element.title} description={element.description} completed={element.completed} pinned={element.pinned} />
    }
    const filterTodos = () => {
        switch (filter) {
            case 'all': {
                const todosArr = todos.map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-5 mt-4">No Todo Available!</p>
            }
            case 'completed': {
                const todosArr = todos.filter(element => element.completed).map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-5 mt-4">No Completed Todo Available!</p>
            }
            case 'incomplete': {
                const todosArr = todos.filter(element => element.completed === false).map(element => generateTodos(element));
                return todosArr.length ? todosArr : <p className="fs-5 mt-4">No Incomplete Todo Available!</p>
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