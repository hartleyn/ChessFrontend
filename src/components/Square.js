import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { liftPiece, dropPiece } from '../actions/chessActions';


class Square extends Component {
	constructor(props) {
		super(props);

		this.state = {
      squareId: `${this.props.row}-${this.props.column}`,
			hasPiece: false,
			piece: {},
		}

		this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.hasPiece) {
      this.props.liftPiece(this.state.piece);
      document.getElementById(this.state.squareId).classList.add('selected');
    }
    else if (!this.state.hasPiece && this.props.holdingPiece) {
      this.props.dropPiece(this.props.liftedPiece, this.props.row, this.props.column, this.props.matchSocket);
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.piecesUpdated !== prevProps.piecesUpdated || this.props.socketMessage !== prevProps.socketMessage) && this.props.piecesUpdated) {
      console.log('piece update');
      let vacantSquare = true;
      this.props.pieces.forEach(piece => {
        if (Number(piece.row) === Number(this.props.row) && Number(piece.column) === Number(this.props.column)) {
          vacantSquare = false;
          this.setState({
            hasPiece: true,
            piece: piece,
          });
        }
      });
      if (this.state.hasPiece && vacantSquare) {
        this.setState({
          hasPiece: false,
          piece: {},
        });
      }
    }
    else if (this.props.socketMessage !== prevProps.socketMessage && this.props.socketMessage['row'] === this.props.row && this.props.socketMessage['column'] === this.props.column && this.props.socketMessage['valid_move']) {
      console.log('boom');
      this.setState({
        hasPiece: true,
        piece: this.props.liftedPiece,
      }, () => {
        this.props.dropPiece(this.props.liftedPiece);
        console.log(this.props.socketMessage);
      });
    }
    else {
      console.log(this.props.piecesUpdated, prevProps.piecesUpdated);
      //console.log(this.props.socketMessage, prevProps.socketMessage);
    }
  }

	render() {
		return (
			<div id={this.state.squareId} className='square' onClick={this.onClick}>
        {
          this.state.hasPiece ? 
          (
            <p>{`${this.state.piece.team} ${this.state.piece.piece_type}`}</p>
          )
          :
          (
            <div style={{display: 'None'}}></div>
          )
        }
			</div>
		)
	}
}

Square.propTypes = {
  pieces: PropTypes.array.isRequired,
  piecesUpdated: PropTypes.bool.isRequired,
  liftedPiece: PropTypes.object.isRequired,
  holdingPiece: PropTypes.bool.isRequired,
  liftPiece: PropTypes.func.isRequired,
  matchSocket: PropTypes.instanceOf(WebSocket),
  //socketMessage: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  pieces: state.chess.pieces,
  piecesUpdated: state.chess.piecesUpdated,
  liftedPiece: state.chess.liftedPiece,
  holdingPiece: state.chess.holdingPiece,
  matchSocket: state.socket.matchSocket,
  socketMessage: state.socket.socketMessage,
});

export default connect(mapStateToProps, { liftPiece, dropPiece })(Square);
