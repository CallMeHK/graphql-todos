import { IResolvers } from 'apollo-server'
import { todoService, Todo, UpdateModel } from '../db/todo.service'

const todo_channel = {
    NEW: 'NEW_TODO',
    UPDATED: 'UPDATED_TODO',
    DELETED: 'DELETED_TODO',
}

const resolvers: IResolvers = {
    Query: {
        getAllTodos: async () => todoService.getAll(),
        getTodo: (_, { id }: { id: number }) => todoService.getOne(id),
    },
    Mutation: {
        addTodo: async (parent, todo: Todo, { pubsub }, info) => {
            const newTodo = await todoService.add(todo)
            if (!newTodo.error) {
                pubsub.publish(todo_channel.NEW, { newTodo })
            }
            return newTodo
        },
        updateTodo: (parent, todo: UpdateModel<Todo>, { pubsub }, info) => {
            const updatedTodo = todoService.update(todo)
            if (updatedTodo.success) {
                pubsub.publish(todo_channel.UPDATED, { updatedTodo })
            }
            return updatedTodo
        },
        deleteTodo: async (parent, { id }: { id: number }, { pubsub }, info) => {
            const deletedTodo = await todoService.delete(id)
            if (!deletedTodo.error) {
                pubsub.publish(todo_channel.DELETED, { deletedTodo })
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
