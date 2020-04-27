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

const GET_TODO = gql`
    query GetTodo($id: Int!) {
        getTodo(id: $id) {
            description
            done
        }
    }
`

export { GET_ALL_TODOS, GET_TODO }
