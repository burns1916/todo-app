import { useState } from 'react'

const TodoForm = ({ addTodo }) => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!name || !date) {
            alert("Please include todo and date")
        } else {
            addTodo({ name, date, reminder })
        }

        setName("")
        setDate("")
        setReminder(false)
    }

    return (
        <>
        <form onSubmit={onSubmit} >
            <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="date">Date: </label>
                <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <label htmlFor="reminder">Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}

export default TodoForm
