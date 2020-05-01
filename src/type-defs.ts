import { gql } from 'apollo-server'

const typeDefs = gql`
    type Todo {
        id: Int
        description: String
        done: Boolean
    }

    type ManyTodos {
        data: [Todo]
        error: String
    }

    type OneTodo {
        data: Todo
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
        updateTodo(id: Int!, description: String, done: Boolean): OneTodo
        deleteTodo(id: Int!): DeletedTodo
    }

    type Subscription {
        newTodo: OneTodo
        updatedTodo: OneTodo
        deletedTodo: DeletedTodo
    }
`

export { typeDefs }
