import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import LogOutButton from './LogOutButton';


class NavBar extends Component {

  render() {
    return (
      <div>
        <nav id="mainNav" className="nav-extended" style={{ backgroundColor: '#eaeaea' }}>
          <div className="nav-wrapper" style={{ minHeight: '50px' }}>
            <Grid
              container
              justify='flex-end'
              alignItems='center'
              spacing={0}
              style={{ minHeight: '50px' }}
            >
              <Grid item><Link to="/"><Button color='secondary' size='medium'>Home</Button></Link></Grid>
              <Grid item><Link to="/lobby"><Button color='secondary' size='medium'>Lobby</Button></Link></Grid>
              {
                this.props.loggedIn ?
                (
                  <Grid item xs={2}>
                    <h6>{`Hello, ${this.props.user.username}!`}</h6>
                    <LogOutButton />
                  </Grid>
                )
                :
                (
                  <Grid item><Link to='/login'><Button color='secondary' size='medium'>Log In</Button></Link></Grid>
                )
              }
            </Grid>
          </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(NavBar);
