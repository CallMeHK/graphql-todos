import { TodoModel } from './todo.model'
import { IORM, ITodo, ReducerTypes } from './todo.interface'

const getAllTodos = async (): Promise<ReducerTypes.AllRecords<ITodo>> => {
    const allTodos = await TodoModel.getAll()
    return allTodos.match<ReducerTypes.AllRecords<ITodo>>({
        Ok: (data: ITodo[]) => ({ data }),
        Err: (error: string) => ({ error }),
    })
}

const getTodo = async (id: number): Promise<ReducerTypes.OneRecord<ITodo>> => {
    const todo = await TodoModel.getOne(id)
    return todo.match<ReducerTypes.OneRecord<ITodo>>({
        Ok: (data: ITodo) => ({ data }),
        Err: (error: string) => ({ error }),
    })
}

const addTodo = async ({ description, done }: IORM.CreateORM<ITodo>): Promise<ReducerTypes.OneRecord<ITodo>> => {
    const createdTodo = await TodoModel.create({ description, done })
    return createdTodo.match<ReducerTypes.OneRecord<ITodo>>({
        Ok: (data: ITodo) => ({ data }),
        Err: (error: string) => ({ error }),
    })
}

const updateTodo = async ({ id, description, done }: IORM.UpdateORMWithID<ITodo>) : Promise<ReducerTypes.OneRecord<ITodo>>=> {
    const updatedTodo = await TodoModel.update(id, {description, done})
    return updatedTodo.match<ReducerTypes.OneRecord<ITodo>>({
        Ok: (data: ITodo) => ({ data }),
        Err: (error: string) => ({ error }),
    })
}

const deleteTodo = async (id: number): Promise<ReducerTypes.DeleteOne> => {
    const deletedTodo = await TodoModel.delete(id)
    return deletedTodo.match<ReducerTypes.DeleteOne>({
        Ok: (response: { id: number }) => ({ id: response.id }),
        Err: (error: string) => ({ error }),
    })
}

const todoService = {
    getAll: getAllTodos,
    getOne: getTodo,
    add: addTodo,
    update: updateTodo,
    delete: deleteTodo,
}

export { todoService }
