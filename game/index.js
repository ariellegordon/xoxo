import { Map } from "immutable";
import { createStore } from "redux";

const board = Map();

const initialState = {
  turn: "X",
  board: board,
  winner: null
};

const MOVE = "MOVE";

let player = board.turn;

export const move = (player, position) => {
  return {
    type: MOVE,
    turn: player,
    position: position
  };
};

function turnReducer(turn = "X", action) {
  if (action.type === MOVE) {
    return turn === "X" ? "O" : "X";
  }
  return turn;
}

function boardReducer(board = board, action) {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.turn);
  } else return board;
}

export default function reducer(state = initialState, action) {
  const nextBoard = boardReducer(state.board, action);
  const winnerState = winner(nextBoard);
  return {
    board: nextBoard,
    winner: winnerState,
    turn: turnReducer(state.turn, action)
  };
}

export function winner(board) {
  for (let i = 0; i < 3; i++) {
    if (streak(board, [i, 0], [i, 1], [i, 2]) !== undefined) {
      return "The winner is ", streak(board, [i, 0], [i, 1], [i, 2]);
    } else if (streak(board, [0, i], [1, i], [2, i]) !== undefined) {
      return "The winner is ", streak(board, [0, i], [1, i], [2, i]);
    }
    if (streak(board, [0, 0], [1, 1], [2, 2]) !== undefined) {
      return "The winner is ", streak(board, [0, 0], [1, 1], [2, 2]);
    }
    if (streak(board, [0, 2], [1, 1], [2, 0]) !== undefined) {
      return "The winner is ", streak(board, [0, 2], [1, 1], [2, 0]);
    }
  }
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      if (!board.hasIn([j, k])) {
        return null;
      }
    }
  }
  return "draw";
}

function streak(board, firstCoord, ...remainingCoords) {
  let comparitor = board.getIn(firstCoord);
  let args = [...remainingCoords];
  let count = 0;
  for (let i = 0; i < args.length; i++) {
    if (comparitor === board.getIn(args[i])) {
      count++;
    }
  }
  if (count === args.length) {
    return comparitor;
  } else {
    return undefined;
  }
}
