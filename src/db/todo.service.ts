import { TodoModel, ITodo } from './todo.model'

export interface Todo {
    description: string
    done: boolean
}

export interface DBFields {
    id: number
}

export type Model<T> = DBFields & T

export type UpdateModel<T> = { id: number } & Partial<T>

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

type AllTodos = { todos?: ITodo[]; error?: string }
const getAllTodos = async (): Promise<AllTodos> => {
    const allTodos = await TodoModel.getAll()
    return allTodos.match<AllTodos>({
        Ok: (todos: ITodo[]) => ({ todos }),
        Err: (error: string) => ({ error }),
    })
}

type OneTodo = { todo?: ITodo; error?: string }
const getTodo = async (id: number): Promise<OneTodo> => {
    const todo = await TodoModel.getOne(id)
    return todo.match<OneTodo>({
        Ok: (todo: ITodo) => ({ todo }),
        Err: (error: string) => ({ error }),
    })
}

const addTodo = async ({ description, done }: Todo): Promise<OneTodo> => {
    const createdTodo = await TodoModel.create({ description, done })
    return createdTodo.match<OneTodo>({
        Ok: (todo: ITodo) => ({ todo }),
        Err: (error: string) => ({ error }),
    })
}

// const addManyTodos = (manyTodos: Todo[]): Model<Todo>[] => manyTodos.map(addTodo)

const updateTodo = async ({ id, description, done }: Partial<ITodo>) : Promise<OneTodo>=> {
    const updatedTodo = await TodoModel.update(id, {description, done})
    return updatedTodo.match<OneTodo>({
        Ok: (todo: ITodo) => ({ todo }),
        Err: (error: string) => ({ error }),
    })
}

type DeleteOne = { id?: number; error?: string }
const deleteTodo = async (id: number): Promise<DeleteOne> => {
    const deletedTodo = await TodoModel.delete(id)
    return deletedTodo.match<DeleteOne>({
        Ok: (response: { id: number }) => ({ id: response.id }),
        Err: (error: string) => ({ error }),
    })
}

const todoService = {
    getAll: getAllTodos,
    getOne: getTodo,
    add: addTodo,
    // addMany: addManyTodos,
    update: updateTodo,
    delete: deleteTodo,
}

export { todoService }
