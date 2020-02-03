import React, {Component} from 'react';
import './Login.scss';
import axios from 'axios';

class Login extends Component {
  state = {email: '', password: ''};

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/authenticate'
        , {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          email: this.state.email,
          password: this.state.password,
        })
        .then(console.log)
        .catch(console.warn);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.getAttribute('id')]: event.target.value});
  };

  render() {
    return (
        <div className="login-panel">
          <form onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
    );
  }
}

export default Login;