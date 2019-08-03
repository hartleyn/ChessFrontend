import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { joinMatch } from '../actions/chessActions';


class JoinMatchButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.joinMatch(this.props.matchId, this.props.token);
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.onClick}>Join Match</Button>
      </div>
    )
  }
}

JoinMatchButton.propTypes = {
  joinMatch: PropTypes.func.isRequired,
  matchId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { joinMatch })(JoinMatchButton);
