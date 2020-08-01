import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAnUser, updateAnUser } from "../user-action";
import { API_USERS } from "../constant";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nama: "",
      alamat: "",
      user: "",
      formStatus: true,
      formSuccess: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let that = this;
    if (this.state.nama && this.state.alamat) {
      axios
        .put(API_USERS + this.state.id, {
          nama: this.state.nama,
          alamat: this.state.alamat,
        })
        .then(function (response) {
          that.setState({
            formSuccess: true,
          });
          that.props.dispatch(updateAnUser(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      that.setState({
        formStatus: false,
      });
    }
  }

  componentDidMount() {
    let that = this;
    axios
      .get(API_USERS + this.props.match.params.userId)
      .then(function (response) {
        that.setState({
          id: response.data.id,
          nama: response.data.nama,
          alamat: response.data.alamat,
          user: {
            nama: response.data.nama,
            alamat: response.data.alamat,
          },
        });
        that.props.dispatch(getAnUser());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onInputChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    const { nama, alamat } = this.state;
    return (
      <div>
        <h3>Edit data user</h3>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="nama"
            value={nama}
            placeholder="Nama"
            onChange={this.onInputChange}
          />
          <br />
          <textarea
            name="alamat"
            value={alamat}
            placeholder="Alamat"
            onChange={this.onInputChange}
          ></textarea>
          <br />
          <input type="submit" value="Simpan" />
        </form>
        {this.state.formSuccess && (
          <div className="success-message">
            Data berhasil diubah. Ingin{" "}
            <Link to="/belajar-react-redux"> kembali </Link>?
          </div>
        )}
        {!this.state.formStatus && (
          <div className="warning-message">Form tidak boleh kosong</div>
        )}
      </div>
    );
  }
}

export default connect()(User);
