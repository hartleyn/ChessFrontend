import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Board from './Board';


class Home extends Component {
  render() {
    return (
      <div>
        <Container maxWidth='md'>
          {
            this.props.loggedIn ?
            ( 
              <div>
                <Board />
              </div>
            )
            :
            (
              <Redirect to='/login' />
            )
          }
        </Container>
      </div>
    )
  }
}

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
});

export default connect(mapStateToProps, {})(Home);
