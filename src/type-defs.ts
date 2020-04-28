import { gql } from 'apollo-server'

const typeDefs = gql`
    type Todo {
        id: Int
        description: String
        done: Boolean
    }

    type UpdateTodo {
        success: Boolean
        todo: Todo
    }

    type Success {
        success: Boolean
    }

    type ManyTodos {
        todos: [Todo]
        error: String
    }

    type OneTodo {
        todo: Todo
        error: String
    }

    type DeletedTodo {
        id: Int
        error: String
    }

    type Query {
        getAllTodos: ManyTodos
        getTodo(id: Int!): OneTodo
    }

    type Mutation {
        addTodo(description: String!, done: Boolean!): OneTodo
        updateTodo(id: Int!, description: String, done: Boolean): UpdateTodo
        deleteTodo(id: Int!): DeletedTodo
    }

    type Subscription {
        newTodo: OneTodo
        updatedTodo: Todo
        deletedTodo: DeletedTodo
    }
`

export { typeDefs }
