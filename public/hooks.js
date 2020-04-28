import React from 'react'
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks'
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './queries/mutation'
import { GET_ALL_TODOS } from './queries/query'
import { NEW_TODO, UPDATED_TODO, DELETED_TODO } from './queries/subscription'

const useGetAllTodos = () => {
    const { loading, error, data } = useQuery(GET_ALL_TODOS)
    const allTodos = !loading && !error ? data.getAllTodos.todos : []
    return { loading, error, data, allTodos }
}

const useAddTodo = () => {
    const [addTodoMutation, { data }] = useMutation(ADD_TODO)
    return addTodoMutation
}

const useEditTodo = () => {
    const [editTodoMutation, { data }] = useMutation(UPDATE_TODO)
    return editTodoMutation
}

const useDeleteTodo = () => {
    const [deleteTodoMutation, { data }] = useMutation(DELETE_TODO)
    return deleteTodoMutation
}

const useSubscriptionCallback = (query, callback) => {
    const { data } = useSubscription(query)
    React.useEffect(() => {
        if (data) {
            console.log({
                query,
                data,
            })
            callback(data)
        }
    }, [data])
    return data
}

const useNewTodoSubscription = (callback) => {
    const data = useSubscriptionCallback(NEW_TODO, callback)
    return data
}

const useUpdateTodoSubscription = (callback) => {
    const data = useSubscriptionCallback(UPDATED_TODO, callback)
    return data
}

const useDeleteTodoSubscription = (callback) => {
    const data = useSubscriptionCallback(DELETED_TODO, callback)
    return data
}

export {
    useGetAllTodos,
    useAddTodo,
    useEditTodo,
    useDeleteTodo,
    useNewTodoSubscription,
    useUpdateTodoSubscription,
    useDeleteTodoSubscription,
}
