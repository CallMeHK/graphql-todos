import React from 'react'
import {
    useGetAllTodos,
    useNewTodoSubscription,
    useAddTodo,
    useEditTodo,
    useDeleteTodo,
    useUpdateTodoSubscription,
    useDeleteTodoSubscription,
} from './hooks'

const App = () => {
    const { loading, error, data, allTodos } = useGetAllTodos()
    const [description, setDescription] = React.useState('')
    const [todos, setTodos] = React.useState(null)

    // mutations
    const addTodo = useAddTodo()

    // subscriptions
    useNewTodoSubscription(({ newTodo }) => setTodos((oldTodos) => [...oldTodos, newTodo]))
    useUpdateTodoSubscription(({ updatedTodo }) =>
        setTodos((oldTodos) => oldTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
    )
    useDeleteTodoSubscription(({ deletedTodo }) => setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== deletedTodo)))

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
        <div style={{ maxWidth: '600px' }}>
            <h2>Todos</h2>
            <input value={description} onChange={handleChange} onKeyPress={handleEnter} />
            <button onClick={() => handleSubmit({ variables: { description, done: false } })}>Submit</button>
            <div>{todos && todos.map((todo) => <TodoPanel key={'todo' + todo.id} todo={todo} />)}</div>
        </div>
    )
}

const TodoPanel = ({ todo }) => {
    const deleteTodo = useDeleteTodo()
    const editTodo = useEditTodo()

    const [editDescription, setEditDescription] = React.useState(todo.description)
    const [editDone, setEditDone] = React.useState(todo.done)
    const [isEditMode, setIsEditMode] = React.useState(false)

    const handleEdit = React.useCallback(() => {
        setEditDescription(todo.description)
        setEditDone(todo.done)
        setIsEditMode(true)
    }, [setEditDescription, setEditDone, setIsEditMode, todo])

    const submitEdit = React.useCallback(async () => {
        await editTodo({
            variables: {
                id: todo.id,
                description: editDescription,
                done: editDone,
            },
        })

        setIsEditMode(false)
    }, [editTodo, setIsEditMode, todo, editDescription, editDone])

    const handleCancel = () => setIsEditMode(false)
    return (
        <div style={{ padding: '8px', margin: '3px', borderStyle: 'solid', borderColor: 'white' }}>
            {!isEditMode && (
                <>
                    <div style={{ padding: '5px' }}>{todo.description}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: todo.done ? 'lightgreen' : 'red' }}>
                            >>>{todo.done ? 'Completed' : 'In Progress'}
                        </div>
                        <div>
                            <button onClick={handleEdit}>Edit</button>{' '}
                            <button onClick={() => deleteTodo({ variables: { id: todo.id } })}>Delete</button>
                        </div>
                    </div>
                </>
            )}
            {isEditMode && (
                <>
                    <div>
                        <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </div>
                    <div>
                        <input type="checkbox" checked={editDone} onChange={() => setEditDone((c) => !c)} />
                        <span>Completed</span>
                    </div>
                    <div>
                        <button onClick={submitEdit}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default App
