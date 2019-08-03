import React, { Component } from 'react'
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { loginUser } from '../actions/authActions';


class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    this.props.loginUser(username, password);
  }

  render() {
    return (
      <div>
        <Grid
          container
          justify="center"
          spacing={1}
        >
          <Grid item xs={4}>
            <TextField
              id="usernameInput"
              label="Username"
              margin="normal"
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          spacing={1}
        >
          <Grid item xs={4}>
            <TextField
              id="passwordInput"
              label="Password"
              type="password"
              margin="normal"
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          spacing={0}
        >
          <Grid item xs={4}>
            <div style={{ marginTop: '16px', padding: '4px' }}>
              <Button variant="contained" color="secondary" size="large" style={{ width: '48%', marginRight: '2%' }} onClick={this.onClick}>Log In</Button>
              <Button variant="outlined" color="secondary" size="large" style={{ width: '48%', marginLeft: '2%' }}>Sign Up</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
