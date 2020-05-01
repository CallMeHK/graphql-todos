import { gql } from 'apollo-boost'

const NEW_TODO = gql`
    subscription {
        newTodo {
            data {
                id
                description
                done
            }
            error
        }
    }
`

const UPDATED_TODO = gql`
    subscription {
        updatedTodo {
            data {
                id
                description
                done
            }
            error
        }
    }
`

const DELETED_TODO = gql`
    subscription {
        deletedTodo {
            id
        }
    }
`

export { NEW_TODO, UPDATED_TODO, DELETED_TODO }
