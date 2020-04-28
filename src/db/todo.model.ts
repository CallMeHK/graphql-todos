import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize'
import { Result } from 'true-myth'
import { sequelize } from './init'

export interface ITodo {
    readonly id: number
    description: string
    done: boolean
    readonly createdAt: Date
    readonly updatedAt: Date
}

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

type FromORM<T> = { dataValues: T }
const getDataValues = <T>(elt: FromORM<T>): T => elt.dataValues
const mapDataValues = <T>(data: FromORM<T>[]): T[] => data.map(getDataValues)

const getAll = async (limit: number = 1000): Promise<Result<ITodo[], string>> => {
    try {
        const unwrappedAllTodos = (await Todo.findAll({ limit })) as FromORM<ITodo>[]
        return Result.ok(unwrappedAllTodos)
            .map(mapDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

const getOne = async (id: number): Promise<Result<ITodo, string>> => {
    try {
        const unwrappedTodo = (await Todo.findByPk(id)) as FromORM<ITodo>
        return Result.ok(unwrappedTodo)
            .map(getDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
    } catch (e) {
        return Result.err(e.message as string)
    }
}

type CreateORM<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
const create = async (todo: CreateORM<ITodo>) => {
    try {
        const unwrappedCreatedTodo = (await Todo.create(todo)) as FromORM<ITodo>
        return Result.ok(unwrappedCreatedTodo)
            .map(getDataValues)
            .orElse(() => Result.err('An unexpected error occurred'))
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

        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log(unwrappedDeleteTodo)
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

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
    delete: deleteOne,
}

export { Todo, init, TodoModel }
