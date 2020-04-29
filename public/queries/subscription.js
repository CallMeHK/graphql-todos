import { gql } from 'apollo-boost'

const NEW_TODO = gql`
    subscription {
        newTodo {
            todo {
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
    todo {
      id, description, done
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
