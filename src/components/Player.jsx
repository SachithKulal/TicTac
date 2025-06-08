import { useState } from "react";

export const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  let editableName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editableName = (
      <input
        required
        type="text"
        defaultValue={playerName}
        onBlur={(e) => {
          setIsEditing(false);
          setPlayerName(e.target.value);
        }}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">{editableName}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};
