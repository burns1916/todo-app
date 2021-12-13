import { useState, useEffect } from 'react'
import TodoForm from './TodoForm';
import Todos from './Todos';

const TodoContainer = () => {

    const [todos, setTodos] = useState([]);
    const [toggleForm, setToggleForm] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const serverTodos = await fetchTodos()
            setTodos(serverTodos)
        }
        fetchData()
    }, [])

    const fetchTodos = async () => {
        const fetchedRes = await fetch('http://localhost:5000/todos')
        const fetchedData = await fetchedRes.json()
        return fetchedData
    }

    const fetchTodo = async (id) => {
        const fetchedRes = await fetch(`http://localhost:5000/todos/${id}`)
        const fetchedData = await fetchedRes.json()
            return fetchedData
    }

    const toggleReminder = async (id) => {
        const todoToToggle = await fetchTodo(id)
        const updatedTodo = {...todoToToggle, reminder: !todoToToggle.reminder}
        const fetchedRes = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodo)
        })
        const fetchedData = await fetchedRes.json()
        setTodos(todos.map((todo) => todo.id === id ? {...todo, reminder: !fetchedData.reminder} : todo))
    }

    const addTodo = async (todo) => {
        const postedTodo = await fetch('http://localhost:5000/todos', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todo),
        })
        const data = await postedTodo.json()
        setTodos([...todos, data])
    }

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE",
        })
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    // const fetchTodos = () => {
    //     return fetch('http://localhost:5000/todos')
    //     .then(resp => resp.json())
    //     .then(data => {
    //         return data
    //     })
    // }

    // const fetchTodo = (id) => {
    //     return fetch(`http://localhost:5000/todos/${id}`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         return data
    //     })
    // }

    // const toggleReminder = (id) => {
    //     const todoToToggle = fetchTodo(id)
    //     const updatedTodo = {...todoToToggle, reminder: !todoToToggle.reminder}
    //     return fetch(`http://localhost:5000/todos/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(updatedTodo)
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setTodos(todos.map((todo) => todo.id === id ? {...todo, reminder: !data.reminder} : todo))
    //     })
    // }

    // const addTodo = (todo) => {
    //     return fetch('http://localhost:5000/todos', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(todo)
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setTodos([...todos, data])
    //     })
    // }

    // const deleteTodo = (id) => {
    //     fetch(`http://localhost:5000/todos/${id}`, {
    //         method: "DELETE",
    //     })
    //     setTodos([todos.filter((todo) => todo.id !== id)])
    // }


    return (
        <>
            <input type="button" onClick={() => setToggleForm(!toggleForm)} value={toggleForm ? "Close Form" : "Add Todo"} />
            {toggleForm && <TodoForm addTodo={addTodo} /> }
            {todos.length > 0 ? <Todos todos={todos} deleteTodo={deleteTodo} onToggle={toggleReminder} /> : "No Todos" }
        </>
    )
}

export default TodoContainer

