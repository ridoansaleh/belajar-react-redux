import {
  ADD_USER,
  FETCH_USERS,
  DELETE_USER,
  UPDATE_AN_USER,
} from "./user-type";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.data];
    case DELETE_USER:
      let usersleft = action.data;
      let res = usersleft.map(function (user) {
        return {
          id: user.id,
          nama: user.nama,
          alamat: user.alamat,
        };
      });
      return res;
    case FETCH_USERS:
      return action.data;
    case UPDATE_AN_USER:
      const newList = [
        action.data,
        ...state.filter((d) => d.id !== action.data.id),
      ].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      return newList;
    default:
      return state;
  }
};

export default userReducer;
