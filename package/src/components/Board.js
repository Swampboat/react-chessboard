import React, { Fragment, useState, useRef, useEffect } from 'react';

import { getRelativeCoords } from '../functions';
import { Notation } from './Notation';
import { Piece } from './Piece';
import { Square } from './Square';
import { Squares } from './Squares';
import { useChessboard } from '../context/chessboard-context';
import { WhiteKing } from './ErrorBoundary';

export function Board() {
  const boardRef = useRef();
  const [squares, setSquares] = useState({});

  const {
    arrows,
    boardOrientation,
    boardWidth,
    clearCurrentRightClickDown,
    customArrowColor,
    showBoardNotation,
    currentPosition,
    premoves
  } = useChessboard();

  useEffect(() => {
    function handleClickOutside(event) {
      if (boardRef.current && !boardRef.current.contains(event.target)) {
        clearCurrentRightClickDown();
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return boardWidth ? (
    <div ref={boardRef} style={{ position: 'relative' }}>
      <Squares>
        {({ square, squareColor, col, row }) => {
          const squareHasPremove = premoves.find((p) => p.sourceSq === square || p.targetSq === square);
          const squareHasPremoveTarget = premoves.find((p) => p.targetSq === square);
          return (
            <Square
              key={`${col}${row}`}
              square={square}
              squareColor={squareColor}
              setSquares={setSquares}
              squareHasPremove={squareHasPremove}
            >
              {currentPosition[square] && <Piece piece={currentPosition[square]} square={square} squares={squares} />}
              {squareHasPremoveTarget && (
                <Piece isPremovedPiece={true} piece={squareHasPremoveTarget.piece} square={square} squares={squares} />
              )}
              {showBoardNotation && <Notation row={row} col={col} />}
            </Square>
          );
        }}
      </Squares>
      <svg
        width={boardWidth}
        height={boardWidth}
        style={{ position: 'absolute', top: '0', left: '0', pointerEvents: 'none', zIndex: '10' }}
      >
        {arrows.map(arrow => <Thing arrow={arrow}/>)}


      </svg>
    </div>
  ) : (
    <WhiteKing />
  );
// TODO global colour check
  function Thing(props) {
    const arrow = props.arrow
      // TODO check array len
      // TODO RM TEMP
      // const ArrowColorDefault = 'rgb(255,170,255)';
      const ArrowColorDefault = 'blue';

      const fromCoords = getRelativeCoords(boardOrientation, boardWidth, arrow?.from || arrow[0]);
      const toCoords = getRelativeCoords(boardOrientation, boardWidth, arrow?.to || arrow[1]);
      
      let arrowColor = !!arrow.color ? arrow.color : ArrowColorDefault;
      // let arrowColor = arrow?.color;
      console.log(arrowColor, " postas");
      // arrowColor ||= ArrowColorDefault;
      // console.log(arrowColor, " 2 2");
      // const key = !!arrow.from  ? `${arrow.from}-${arrow.to}` : `${arrow[0]}-${arrow[1]}`
      const widthModifier = arrow?.widthModifier || 1;
      console.log(arrowColor, widthModifier); // TODO remove
      return (
        // <Fragment key={key}>
        // <Fragment  color={arrowColor}>
        <Fragment>
          <defs>
            <marker id="arrowhead" markerWidth="2" markerHeight="2.5" refX="1.25" refY="1.25" orient="auto" color={arrowColor}>
              <polygon points="0 0, 2 1.25, 0 2.5"  fill="currentcolor" /> 
            </marker>
          </defs>
          <line
            color={arrowColor}
            x1={fromCoords.x}
            y1={fromCoords.y}
            x2={toCoords.x}
            y2={toCoords.y}
            stroke="currentcolor"
            style={{  strokeWidth: boardWidth / 36 * widthModifier }}
            markerEnd="url(#arrowhead)"
            markerStart="url(#arrowhead)"
          />
        </Fragment>
      );
    }
  }

