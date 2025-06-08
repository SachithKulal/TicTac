import {
  SYMBOLS,
  INITIAL_GAME_BOARD,
  WINNING_COMBINATIONS,
} from "../constants/constants.js";

export const deriveActivePlayer = (gameTurn) => {
  let currentPlayer = SYMBOLS.X;

  if (gameTurn.length > 0 && gameTurn[0].player === SYMBOLS.X) {
    currentPlayer = SYMBOLS.O;
  }
  return currentPlayer;
};

export const deriveGameBoard = (gameTurn) => {
  const gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

export function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      break;
    }
  }
  return winner;
}
