import { ADD_USER, FETCH_USERS, DELETE_USER } from './user-type'; 

export const addNewUser = (user) => ({
    type: ADD_USER,
    data: user
})

export const fetchAllUsers = (users) => ({
    type: FETCH_USERS,
    data: users
})

export const deleteUser = (usersleft) => ({
    type: DELETE_USER,
    data: usersleft
})