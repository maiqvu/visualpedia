import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

class Quiz extends Component {
  componentDidMount() {
    console.log('Fetching questions...');

    const {authResult: {auth_token}, questionsFetched} = this.props;
    console.log('Token', auth_token);

    axios.get('http://localhost:3000/quiz/20.json', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    }).then((res) => {
      console.log(res);
      questionsFetched(res.data);
    }).catch(console.warn);
  }

  render() {
    return (
        <div>
          <h1>Quiz</h1>
        </div>
    );
  }
}

Quiz.propTypes = {
  authResult: PropTypes.object.isRequired,
  questionsFetched: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authResult: state.auth,
});

export default connect(mapStateToProps, actionCreators)(Quiz);