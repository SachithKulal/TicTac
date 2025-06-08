import { useState } from "react";

import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { SYMBOLS, PLAYERS } from "./constants/constants.js";
import { GameOver } from "./components/GameOver";
import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./utils/ticTacToe.js";

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare({ rowIndex, colIndex }) {
    setGameTurn((prev) => {
      const currentPlayer = deriveActivePlayer(prev);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prev,
      ];

      return updatedTurns;
    });
  }

  function reStartGame() {
    setGameTurn([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol={SYMBOLS.X}
            isActive={activePlayer === SYMBOLS.X}
            onChangeName={handlePlayerChange}
          />
          <Player
            name={PLAYERS.O}
            symbol={SYMBOLS.O}
            isActive={activePlayer === SYMBOLS.O}
            onChangeName={handlePlayerChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={reStartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
