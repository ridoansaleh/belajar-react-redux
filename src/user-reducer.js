import { ADD_USER, FETCH_USERS, DELETE_USER, UPDATE_AN_USER } from './user-type';

const userReducer = (state = [], action) => {
    console.log('action : ', action);
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.data
            ]
        case DELETE_USER:
            let usersleft = action.data
            let res = usersleft.map(function(user){
                return {
                    id: user.id,
                    nama: user.nama,
                    alamat: user.alamat
                }
            })
            return res
        case FETCH_USERS:
            return action.data
        case UPDATE_AN_USER: 
            return [
                ...state,
                action.data
            ]
        default:
            return state
    }
}

export default userReducer;