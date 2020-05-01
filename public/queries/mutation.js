import { gql } from 'apollo-boost'

const ADD_TODO = gql`
    mutation AddTodo($description: String!, $done: Boolean!) {
        addTodo(description: $description, done: $done) {
            data {
                id
                description
                done
            }
            error
        }
    }
`

const UPDATE_TODO = gql`
    mutation UpdateTodo($id: Int!, $description: String, $done: Boolean) {
        updateTodo(id: $id, description: $description, done: $done) {
            data {
                id
                description
                done
            }
            error
        }
    }
`

const DELETE_TODO = gql`
    mutation DeleteTodo($id: Int!) {
        deleteTodo(id: $id) {
            id
            error
        }
    }
`

export { ADD_TODO, UPDATE_TODO, DELETE_TODO }
