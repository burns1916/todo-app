const Todos = ({ todos, deleteTodo, onToggle }) => {
    return (
        <>
            {
                todos.map((todo) =>
                <div key={todo.id} onDoubleClick={() => onToggle(todo.id)}>
                 <li>
                     {todo.name} - {todo.date}
                     <input type="button" onClick={() => deleteTodo(todo.id)} value="X" />
                </li>
                </div>
                )
            }
        </>
    )
}

export default Todos
