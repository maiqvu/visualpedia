import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import * as actionCreators from '../../actions';
import './style.scss';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleSubmit = (event) => {
    const {loginSuccess, loginFail} = this.props;

    event.preventDefault();
    axios.post('http://localhost:3000/users.json'
        , {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation,
          },
        })
        .then((res) => {
          // console.log(res);
          loginSuccess(res.data);
          localStorage.setItem('auth_token', res.data.auth_token);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('email', res.data.email);
          this.props.history.push('/');
        })
        .catch((error) => {
          console.warn(error);
          loginFail();
        });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.getAttribute('id')]: event.target.value});
  };

  render() {
    const {authResult} = this.props;
    return (
        <div className="login-panel">
          {
            authResult.hasOwnProperty('error') &&
            <Alert variant="danger">
              Incorrect email or password.
            </Alert>
          }
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control"
                     id="name" aria-describedby="nameHelp"
                     onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control"
                     id="email" aria-describedby="emailHelp"
                     onChange={this.handleChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll
                never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"
                     id="password"
                     onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirmation
                password</label>
              <input type="password" className="form-control"
                     id="passwordConfirmation"
                     onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
        </div>
    );
  }
}

Signup.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  loginFail: PropTypes.func.isRequired,
  authResult: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, actionCreators)(Signup);