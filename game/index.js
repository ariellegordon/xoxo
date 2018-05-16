import { Map } from 'immutable';
import { createStore } from 'redux';

const board = Map();

const initialState = {
  turn: 'X',
  board: board
};

const MOVEX = 'MOVEX';
const MOVEO = 'MOVEO';

const MOVE = 'MOVE';
// export const move = (type, position, player) => {
//   return {
//     type: type,
//     position: position,
//     player: player
//   };
// };
let player = board.turn;

export const move = (player, position) => {
  return {
    type: MOVE,
    turn: player,
    position: position
  };
};

export default function reducer(state = initialState, action) {
  // TODO
  console.log('action: ', action);
  console.log('state', state);
  ///if (state === {}) state = initialState;
  //const newState = Object.assign({}, state);
  switch (action.type) {
    case MOVE:
      //ternary for if x, make move x at position
      console.log('oldboard:', board);
      return {
        board: board.setIn(action.position, action.turn),

        turn: action.turn === 'X' ? 'O' : 'X'
      };
    default:
      return state;
  }
  // switch(action.turn){
  //   case X:
  //   case O:
  //   default:
  //     retur
  // }
}

// export const game = createStore(reducer);
