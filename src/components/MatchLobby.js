import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchMatches } from '../actions/chessActions';
import { fetchUserDetails } from '../actions/authActions';

import JoinMatchButton from './JoinMatchButton';
import CreateMatchButton from './CreateMatchButton';


class MatchLobby extends Component {

  componentDidMount() {
    this.props.fetchMatches();
  }

  render() {
    const matches = this.props.matches.map(match => (
      <div key={match.id}>
        <h6>Match {match.id}</h6>
        <p>{match.users}</p>
        <JoinMatchButton matchId={match.id} />
      </div>
    ));
    return !this.props.matchJoined ?
    (
      <div>
        <CreateMatchButton />
        {matches}
      </div>
    )
    :
    (
      <Redirect to='/' />
    )
  }
}

MatchLobby.propTypes = {
  fetchMatches: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  matchJoined: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  matches: state.chess.matches,
  matchJoined: state.chess.matchJoined,
  token: state.auth.token,
})

export default connect(mapStateToProps, { fetchMatches, fetchUserDetails })(MatchLobby);
