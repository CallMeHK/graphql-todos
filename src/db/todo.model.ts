import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize'
import { Result } from 'true-myth'
import { sequelize } from './init'
import { IORM, ITodo } from './todo.interface'

class Todo extends Model {
    public id!: number
    public description!: string
    public done!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

const init = async () =>
    Todo.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'todos',
        }
    )

const getDataValues = <T>(elt: IORM.FromORM<T>): T => elt.dataValues
const mapDataValues = <T>(data: IORM.FromORM<T>[]): T[] => data.map(getDataValues)

const getAll = async (limit: number = 1000): Promise<Result<ITodo[], string>> => {
    try {
        const unwrappedAllTodos = (await Todo.findAll({ limit, order: [['id', 'ASC']] })) as IORM.FromORM<ITodo>[]
        return Result.ok(unwrappedAllTodos)
            .map(mapDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

const getOne = async (id: number): Promise<Result<ITodo, string>> => {
    try {
        const unwrappedTodo = (await Todo.findByPk(id)) as IORM.FromORM<ITodo>
        return Result.ok(unwrappedTodo)
            .map(getDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

export type CreateORM<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
const create = async (todo: CreateORM<ITodo>) => {
    try {
        const unwrappedCreatedTodo = (await Todo.create(todo)) as IORM.FromORM<ITodo>
        return Result.ok(unwrappedCreatedTodo)
            .map(getDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

export type UpdateORM<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
export type UpdateResponse<T> = [number, IORM.FromORM<T>[]]
const update = async (id: number, partialTodo: UpdateORM<ITodo>): Promise<Result<ITodo, string>> => {
    try {
        const unwrappedUpdatedTodo = (await Todo.update(partialTodo, {
            where: {
                id,
            },
            returning: true,
        })) as UpdateResponse<ITodo>

        return Result.ok(unwrappedUpdatedTodo)
            .chain((result: UpdateResponse<ITodo>) => (result[0] > 0 ? Result.ok(result) : Result.err('Record does not exist')))
            .map((result: UpdateResponse<ITodo>) => result[1][0])
            .map(getDataValues)
            .mapErr((error: any) => (typeof error === 'string' ? error : 'An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

const deleteOne = async (id: number): Promise<Result<{ id: number }, string>> => {
    try {
        const unwrappedDeleteTodo = (await Todo.destroy({
            where: {
                id,
            },
        })) as number

        return Result.ok(unwrappedDeleteTodo)
            .chain((result: number) => (result > 0 ? Result.ok(result) : Result.err('Record does not exist')))
            .map((result: number) => ({ id }))
            .mapErr((error: any) => (typeof error === 'string' ? error : 'An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

const TodoModel = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteOne,
}

export { Todo, init, TodoModel }
