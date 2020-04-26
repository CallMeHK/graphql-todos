export interface Todo {
    description: string
    done: boolean
}

export interface DBFields {
    id: number
}

export type Model<T> = DBFields & T

export type UpdateModel<T> = {id: number} & Partial<T>

let todos: Model<Todo>[] = [
    {
        id: 1,
        description: 'do this',
        done: false,
    },
    {
        id: 2,
        description: 'do that',
        done: false,
    },
    {
        id: 3,
        description: 'do somethin else',
        done: true,
    },
]

let newId = 4

const getAllTodos = () => todos

const getTodo = (id: number) => todos.filter((todo: Model<Todo>) => todo.id === id)[0]

const addTodo = ({description, done}: Todo): Model<Todo> => {
    const newTodo = { id: newId, description, done }
    todos = [...todos, newTodo]
    newId = newId + 1
    return newTodo
}

const addManyTodos = (manyTodos: Todo[]): Model<Todo>[] => manyTodos.map(addTodo)

const updateTodo = ({ id, description, done }: UpdateModel<Todo>) => {
    const todoIndex = todos.findIndex((todo: Model<Todo>) => todo.id === id)
    if (todoIndex > -1) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            ...(description && { description }),
            ...(done && { done }),
        }
        return {
            success: true,
            todo: todos[todoIndex],
        }
    }
    return {
        success: false,
    }
}

const deleteTodo = (id: number) => {
    if (todos.findIndex((todo: Model<Todo>) => todo.id === id) === -1) {
        return {
            success: false,
        }
    }
    todos = todos.filter((todo: Model<Todo>) => todo.id !== id)
    return {
        success: true,
    }
}

const todoService = {
    getAll: getAllTodos,
    getOne: getTodo,
    add: addTodo,
    addMany: addManyTodos,
    update: updateTodo,
    delete: deleteTodo
}

export {
    todoService
}
