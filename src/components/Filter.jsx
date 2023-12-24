import { useMode } from "../context/ModeContext";

function Filter({onFilterTodos,filter}) {
    const mode = useMode();
    return (
        <div className="btn-group d-flex d-md-block" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => onFilterTodos('all')}/>
            <label className={`btn btn-${filter === 'all' ? 'success' : mode === 'light' ? 'primary' : 'secondary'} px-md-3 py-md-2`} htmlFor="btnradio1">All</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => onFilterTodos('completed')}/>
            <label className={`btn btn-${filter === 'completed' ? 'success' : mode === 'light' ? 'primary' : 'secondary'} px-md-3 py-md-2`} htmlFor="btnradio2">Completed</label>

            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => onFilterTodos('incomplete')}/>
            <label className={`btn btn-${filter === 'incomplete' ? 'success' : mode === 'light' ? 'primary' : 'secondary'} px-md-3 py-md-2`} htmlFor="btnradio3">Incomplete</label>
        </div>
    )
}
export default Filter;