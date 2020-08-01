import { connect } from "react-redux";
import App from "./components/App";
import { addNewUser, fetchAllUsers, deleteUser } from "./user-action";

const mapStateToProps = (state) => ({
  users: state,
});

const mapActionToProps = (dispatch) => ({
  saveUser: (user) => dispatch(addNewUser(user)),
  getAllUsers: (users) => dispatch(fetchAllUsers(users)),
  deleteUser: (usersleft) => dispatch(deleteUser(usersleft)),
});

export default connect(mapStateToProps, mapActionToProps)(App);
