import React from 'react'
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks'
import { GET_ALL_TODOS, NEW_TODO, ADD_TODO } from './queries'

const useGetAllTodos = () => {
    const { loading, error, data } = useQuery(GET_ALL_TODOS)
    const allTodos = !loading && !error ? data.getAllTodos : []
    return { loading, error, data, allTodos }
}

const useAddTodo = () => {
    const [addTodoMutation, { data }] = useMutation(ADD_TODO)

    return addTodoMutation
}

const useNewTodoSubscription = (callback) => {
    const { data } = useSubscription(NEW_TODO)
    React.useEffect(() => {
        if (data) {
            callback(data)
        }
    }, [data])
    return data
}

export { useGetAllTodos, useNewTodoSubscription, useAddTodo }
