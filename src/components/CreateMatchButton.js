import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { createMatch } from '../actions/chessActions';


class CreateMatchButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.createMatch(this.props.token);
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.onClick}>Create Match</Button>
      </div>
    )
  }
}

CreateMatchButton.propTypes = {
  createMatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps, { createMatch })(CreateMatchButton);
