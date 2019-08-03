import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { createNewAccount } from '../actions/authActions';


class CreateMatchButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const username = document.getElementById('usernameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const passwordConfirm = document.getElementById('passwordConfirmInput').value;

    this.props.createNewAccount(username, email, password, passwordConfirm);
  }

  render() {
    return this.props.accountCreated ?
      (
        <Redirect to='/lobby' />
      )
      :
      (
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
                id="emailInput"
                label="Email"
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
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                id="passwordConfirmInput"
                label="Confirm Password"
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
                <Button variant="contained" color="secondary" size="large" style={{ width: '48%', marginRight: '2%' }} onClick={this.onClick}>Sign Up</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )
  }
}

CreateMatchButton.propTypes = {
  createNewAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  accountCreated: state.auth.accountCreated,
});

export default connect(mapStateToProps, { createNewAccount })(CreateMatchButton);
