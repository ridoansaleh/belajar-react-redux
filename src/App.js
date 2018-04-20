import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewUser, fetchAllUsers, deleteUser } from './user-action';
import './app-style.css';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      nama: '',
      alamat: '',
      users: []
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount () {
    let that = this;
    axios.get('http://localhost:4000/users/')
    .then(function (response) {
      that.props.getAllUsers(response.data);
      that.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.users !== this.state.users) {
      this.setState({
        users: nextProps.users
      })
    }
  }

  deleteUser (e, userId) {
    e.preventDefault();
    let that = this;
    axios.delete('http://localhost:4000/users/' + userId)
    .then(function(response){
      let users = that.state.users;
      for (let a=0; a<users.length; a++) {
        if (userId === users[a].id) {
          users.splice(a, 1);
        }
      }
      that.props.deleteUser(users);
    })
    .catch(function(error){
      console.log(error);
    });
  }

  onInputChange (e) {
    const state = this.state;
    state[e.target.name] = e.target.value; 
    this.setState(state);
  }

  handleFormSubmit (e) {
    e.preventDefault();
    let that = this;
    if (this.state.nama && this.state.alamat) {
      let uLength = that.state.users.length;
      let lastId  = uLength === 0 ? 0 : that.state.users[uLength-1].id;
      axios.post('http://localhost:4000/users/', {
        id: this.state.users.length > 0 ? (lastId + 1) : 1, 
        nama: this.state.nama,
        alamat: this.state.alamat
      })
      .then(function (response) {
        that.props.saveUser(response.data);
      })
      .catch(function (error) {
        console.log(error)
      });
    } else {
      alert("Error: Form tidak boleh kosong");
    }
  }

  render() {
    const { nama, alamat } = this.state;
    let that = this;
    return (
      <div>
        <table id="users">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            { 
              this.state.users.length > 0
              ? this.state.users.map(function(user, i){
                return (
                  <tr key={i}>
                    <td>{user.id}</td>
                    <td>{user.nama}</td>
                    <td>{user.alamat}</td>
                    <td>
                      <a href="/" onClick={ (e) => that.deleteUser(e, user.id) }> Hapus </a>
                    </td>
                  </tr>
                )
              })
              : <tr><td colSpan="4">Belum ada user</td></tr>
            }
          </tbody>
        </table>
        <div>
          <h3>Input data user baru</h3>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" name="nama" value={nama} placeholder="Nama" onChange={this.onInputChange} />
            <br/>
            <textarea name="alamat" value={alamat} placeholder="Alamat" onChange={this.onInputChange} ></textarea>
            <br/>
            <input type="submit" value="Simpan" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state
})

const mapActionToProps = dispatch => ({
  saveUser: user => dispatch(addNewUser(user)),
  getAllUsers: users => dispatch(fetchAllUsers(users)),
  deleteUser: usersleft => dispatch(deleteUser(usersleft))
})

export default connect(mapStateToProps, mapActionToProps)(App);
