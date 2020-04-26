import { IResolvers } from 'apollo-server'
import { todoService, Todo, UpdateModel } from '../db/todo.service'

const todo_channel = {
    NEW: 'NEW_TODO',
    UPDATED: 'UPDATED_TODO',
    DELETED: 'DELETED_TODO',
}

const resolvers: IResolvers = {
    Query: {
        getAllTodos: () => todoService.getAll(),
        getTodo: (_, { id }: { id: number }) => todoService.getOne(id),
    },
    Mutation: {
        addTodo: (parent, todo: Todo, { pubsub }, info) => {
            const newTodo = todoService.add(todo)
            pubsub.publish(todo_channel.NEW, { newTodo })
            return newTodo
        },
        updateTodo: (parent, todo: UpdateModel<Todo>, { pubsub }, info) => {
            const updatedTodo = todoService.update(todo)
            if (updatedTodo.success) {
                pubsub.publish(todo_channel.UPDATED, { updatedTodo: updatedTodo.todo })
            }
            return updatedTodo
        },
        deleteTodo: (parent, { id }: { id: number }, { pubsub }, info) => {
            const deletedTodo = todoService.delete(id)
            if (deletedTodo.success) {
                pubsub.publish(todo_channel.DELETED, { deletedTodo: id })
            }
            return deletedTodo
        },
    },
    Subscription: {
        newTodo: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(todo_channel.NEW),
        },
        updatedTodo: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(todo_channel.UPDATED),
        },
        deletedTodo: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(todo_channel.DELETED),
        },
    },
}

export { resolvers }
