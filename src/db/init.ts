import { Sequelize } from 'sequelize'
import * as TodoModel from './todo.model'

const sequelize = new Sequelize('postgres://user:pass@localhost:35432/db') // Example for postgres

const init = async () => {
    try {
        TodoModel.init()

        await sequelize.sync()

        const firstTodo = await TodoModel.Todo.findByPk(1)
        
        if (!firstTodo) {
            TodoModel.Todo.create({
                description: 'hello',
                done: false,
            })
            TodoModel.Todo.create({
                description: 'my name is elder price',
                done: false,
            })
            TodoModel.Todo.create({
                description: 'and i would like to share with you the most amazing book',
                done: false,
            })
        }

        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export { init, sequelize }
