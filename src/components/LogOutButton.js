import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../actions/authActions';


class LogOutButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.logoutUser(this.props.token);
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.onClick}>Log Out</Button>
      </div>
    )
  }
}

LogOutButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
});

export default connect(mapStateToProps, { logoutUser })(LogOutButton);
