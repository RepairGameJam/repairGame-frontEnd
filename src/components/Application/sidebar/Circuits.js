import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import PIECES from '../../PIECES_SHAPES';

const CircuitsWrapper = styled.div`
  flex-grow: 3;
  background-color: rgba(196, 196, 196, 1);
  margin: 2em;
  border-radius: 20px;
  user-select: none;
`;

const Header = styled.h3`
  text-align: center;
  margin-top: 2em;
`;

const PieceContainer = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;
`;

const PieceColumn = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Piece = ({ pieceType, imageUrl }) => {
  const pickup = useMemo(() => new Audio('/audio/PICKUP.mp3'), []);
  const correct = useMemo(() => new Audio('/audio/CORRECT.mp3'), []);
  const incorrect = useMemo(() => new Audio('/audio/INCORRECT.mp3'), []);
  const [{ opacity }, dragRef] = useDrag({
    item: { type: pieceType },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        correct.play();
        return;
      }
      incorrect.play();
    },
    collect: monitor => {
      if (monitor.isDragging()) {
        pickup.play();
      }
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  return <PieceContainer style={{ opacity }} imageUrl={imageUrl} ref={dragRef} />;
};

const Circuits = () => {
  const requiredPieces = useSelector(state => state.game.requiredPieces);
  const level = useSelector(state => state.game.level);

  return (
    <CircuitsWrapper>
      <Header>Circuit Parts</Header>
      <PieceColumn>
        {level
          ? requiredPieces.map(pieceType => {
              const piece = PIECES[pieceType];
              return <Piece {...piece} key={pieceType} />;
            })
          : null}
      </PieceColumn>
    </CircuitsWrapper>
  );
};

export default Circuits;
