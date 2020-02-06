import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
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
    const {signup} = this.props;

    event.preventDefault();
    signup(this.state).then(() => {
      this.props.history.push('/');
    }).catch(console.warn);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.getAttribute('id')]: event.target.value});
  };

  render() {
    const {authResult} = this.props;
    return (
        <div className="sign-panel">
          {
            authResult.hasOwnProperty('signUpError') &&
            <Alert variant="danger">
              Sign-up failed. Please make sure the password and password
              confirmation match.
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
