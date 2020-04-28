import { gql } from 'apollo-boost'

const GET_ALL_TODOS = gql`
    {
        getAllTodos {
            todos {
                id
                description
                done
            }
            error
        }
    }
`

const GET_TODO = gql`
    query GetTodo($id: Int!) {
        getTodo(id: $id) {
            todo {
                id
                description
                done
            }
            error
        }
    }
`

export { GET_ALL_TODOS, GET_TODO }
