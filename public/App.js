import React from 'react'
import { useGetAllTodos, useNewTodoSubscription, useAddTodo } from './hooks'

const App = () => {
    const { loading, error, data, allTodos } = useGetAllTodos()
    const [description, setDescription] = React.useState('')
    const [todos, setTodos] = React.useState(null)
    const addTodo = useAddTodo()
    useNewTodoSubscription(({ newTodo }) => setTodos((oldTodos) => [...oldTodos, newTodo]))

    const handleChange = React.useCallback(
        (e) => {
            setDescription(e.target.value)
        },
        [setDescription]
    )

    const handleSubmit = React.useCallback(
        (todo) => {
            if (description) {
                addTodo(todo)
                setDescription('')
            }
        },
        [description, setDescription, addTodo]
    )

    const handleEnter = React.useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleSubmit({ variables: { description, done: false } })
            }
        },
        [handleSubmit, description]
    )

    React.useEffect(() => {
        if (loading === false) {
            setTodos(allTodos)
        }
    }, [loading])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div>
            <h2>Add todo</h2>
            <input value={description} onChange={handleChange} onKeyPress={handleEnter} />
            <button onClick={() => handleSubmit({ variables: { description, done: false } })}>Submit</button>
            <div>{todos && todos.map((todo) => <li key={'todo' + todo.id}>{todo.description}</li>)}</div>
        </div>
    )
}

export default App
