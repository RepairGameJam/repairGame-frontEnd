import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Lobby = () => {
  const room = useSelector(state => state.game);
  const userID = useSelector(state => state.game.userID);
  const winSound = useMemo(() => new Audio('/audio/WIN.mp3'), []);
  const loseSound = useMemo(() => new Audio('/audio/LOSE.mp3'), []);
  let max = { userID: '', score: 0 };
  useEffect(() => {
    if (room.state === 'leaderboard') {
      Object.keys(room.players).forEach(player => {
        if (room.players[player].score > max.score) {
          max = { userID: player, score: room.players[player].score };
        }
      });
      if (max.userID === userID) {
        winSound.play();
      } else {
        loseSound.play();
      }
    }
  }, [room.state]);
  if (room.state === 'leaderboard') {
    Object.keys(room.players).forEach(player => {
      if (room.players[player].score > max.score) {
        max = { userID: player, score: room.players[player].score };
      }
    });
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Leaderboard </h1>
      <ul>
        {room &&
          Object.keys(room.players).map(playerId => (
            <li key={playerId}>
              {playerId} {playerId === userID && <b>**YOU**</b>} - {room.players[playerId].score}
            </li>
          ))}
      </ul>
      {room.level !== 'level3' && 'Next round starts soon'}
      {room.level === 'level3' && max.userID === userID && 'CONGRATS YOU WIN!!!' && (
        <img src="https://image.shutterstock.com/image-vector/grandma-idea-260nw-46657123.jpg" alt="happy grandma" />
      )}
      {room.level === 'level3' && max.userID !== userID && 'Sorry, you lost!!!'}
    </div>
  );
};

export default Lobby;
