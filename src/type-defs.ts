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

    type Query {
        getAllTodos: [Todo]
        getTodo(id: Int!): Todo
    }

    type Mutation {
        addTodo(description: String!, done: Boolean!): Todo
        updateTodo(id: Int!, description: String, done: Boolean): UpdateTodo
        deleteTodo(id: Int!): Success
    }

    type Subscription {
        newTodo: Todo,
        updatedTodo: Todo,
        deletedTodo: Int
    }
`

export { typeDefs }
