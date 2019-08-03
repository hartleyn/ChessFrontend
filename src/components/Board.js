import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPieces, endTurn } from '../actions/chessActions';
import { connectToMatchWebSocket, receiveSocketMessage } from '../actions/socketActions'; 

import Row from './Row';
import ColumnHeaderRow from './ColumnHeaderRow';


class Board extends Component {

  componentDidMount() {
    this.props.fetchPieces(this.props.matchId);
    this.props.connectToMatchWebSocket(this.props.matchId, this.props.token);
	}

	componentDidUpdate(prevProps) {
		if (this.props.socketConnected !== prevProps.socketConnected && this.props.socketConnected) {
			this.props.matchSocket.onmessage = (event) => {
				var data = JSON.parse(event.data);
				var msg = data['message'];
				console.log(msg);
				this.props.receiveSocketMessage(msg);
			}
    }
    // SERVER RESPONSE TO ATTEMPTED MOVE
    else if (this.props.socketMessage !== prevProps.socketMessage) {
      console.log(this.props.socketMessage);
      if (this.props.socketMessage['move_valid']) {
        this.props.endTurn();
        this.props.fetchPieces(this.props.matchId);
        
        const selectedSquares = document.getElementsByClassName('selected');
        if (selectedSquares.length > 0) {
          selectedSquares[0].classList.remove('selected');
        }
      }
    }
	}

	render() {
		return (
      <div>
        <h1>Board</h1>
        <div id='board'>
          <ColumnHeaderRow />
          <Row row='7' firstColor='lightSquare' secondColor='darkSquare' />
          <Row row='6' firstColor='darkSquare' secondColor='lightSquare' />
          <Row row='5' firstColor='lightSquare' secondColor='darkSquare' />
          <Row row='4' firstColor='darkSquare' secondColor='lightSquare' />
          <Row row='3' firstColor='lightSquare' secondColor='darkSquare' />
          <Row row='2' firstColor='darkSquare' secondColor='lightSquare' />
          <Row row='1' firstColor='lightSquare' secondColor='darkSquare' />
          <Row row='0' firstColor='darkSquare' secondColor='lightSquare' />
          <ColumnHeaderRow />
        </div>
      </div>
		)
	}
}

Board.propTypes = {
  fetchPieces: PropTypes.func.isRequired,
  endTurn: PropTypes.func.isRequired,
  connectToMatchWebSocket: PropTypes.func.isRequired,
  receiveSocketMessage: PropTypes.func.isRequired,
  pieces: PropTypes.array.isRequired,
  socketConnected: PropTypes.bool.isRequired,
  matchSocket: PropTypes.instanceOf(WebSocket),
  //socketMessage: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  matchId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  pieces: state.chess.pieces,
  matchSocket: state.socket.matchSocket,
  socketConnected: state.socket.socketConnected,
  socketMessage: state.socket.socketMessage,
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
  matchId: state.chess.matchId,
});

export default connect(mapStateToProps, { fetchPieces, endTurn, connectToMatchWebSocket, receiveSocketMessage })(Board);
