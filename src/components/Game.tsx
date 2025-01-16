import { useState } from 'react';

export default function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const [x, setX] = useState<number>(Math.floor(Math.random() * 80) + 15);
  const [y, setY] = useState<number>(Math.floor(Math.random() * 80) + 15);

  function setDot() {
    randomPosition();

    setScore(score + 1);
    setTimeout(() => {}, 100);
  }

  function randomPosition() {
    setX(Math.floor(Math.random() * 98));
    setY(Math.floor(Math.random() * 98));
  }

  return (
    <div className="game flex justify-center items-center">
      {start ? (
        <div className="flex flex-col h-full w-full justify-center items-center gap-10">
          <div className="gameContainer">
            <div
              className={`gameDot h-8 w-8 cursor-pointer rounded-full relative`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setDot()}
            ></div>
          </div>
          <button
            className="startButton text-4xl w-1/12"
            onClick={() => setStart(!start)}
          >
            End
          </button>
        </div>
      ) : (
        <button
          className="startButton text-4xl w-1/12"
          onClick={() => setStart(!start)}
        >
          START
        </button>
      )}
    </div>
  );
}
