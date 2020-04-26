import { gql } from 'apollo-boost'

const GET_ALL_TODOS = gql`
    {
        getAllTodos {
            id
            description
            done
        }
    }
`

const ADD_TODO = gql`
    mutation  AddTodo($description: String!,$done:Boolean!) {
        addTodo(description: $description, done: $done) {
            id
            description
            done
        }
    }
`

const NEW_TODO = gql`
    subscription {
        newTodo {
            id
            description
            done
        }
    }
`

export { GET_ALL_TODOS, ADD_TODO, NEW_TODO }
