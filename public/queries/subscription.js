import { gql } from 'apollo-boost'

const NEW_TODO = gql`
    subscription {
        newTodo {
            id
            description
            done
        }
    }
`

const UPDATED_TODO = gql`
    subscription {
        updatedTodo {
            id
            description
            done
        }
    }
`

const DELETED_TODO = gql`
    subscription {
        deletedTodo
    }
`

export { NEW_TODO, UPDATED_TODO, DELETED_TODO }
