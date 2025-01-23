import { FaHeart } from 'react-icons/fa';

interface GameContainerProps {
  gameData: {
    start: boolean;
    highScore: number;
    isAnimating: boolean;
    score: number;
    time: number;
    lives: number;
    category: string;
    solved: string[];
    word: string;
    key: string;
  };
}

export default function GameContainer({ gameData }: GameContainerProps) {
  const {
    start,
    highScore,
    isAnimating,
    score,
    time,
    lives,
    category,
    solved,
    word,
    key,
  } = gameData;
  return (
    <div
      className={`gameContainer flex flex-col justify-between  ${
        isAnimating ? 'turnOn' : 'turnOff'
      }  ${start ? 'visible' : 'invisible'}`}
    >
      <div className="flex flex-row justify-between text-center ">
        <div className="text-4xl w-1/3" data-testid="score">
          score: {score} highScore: {highScore}
        </div>
        <div className="text-8xl  w-1/3" data-testid="time">
          {time}
        </div>
        <div className="text-4xl w-1/3 flex flex-row gap-5 justify-center">
          {Array.from({ length: lives }, (_, index) => (
            <FaHeart key={index} data-testid="heart-icon" />
          ))}
        </div>
      </div>
      <div className=" h-1/2d">
        <div className="text-6xl" data-testid="category">
          {category}
        </div>
        {process.env.NODE_ENV === 'development' ? <div>{word}</div> : null}

        <div className="flex flex-row gap-5 justify-center ">
          {solved.map((letter, index) => (
            <div className="text-8xl" key={index} data-testid="letter">
              {letter}
            </div>
          ))}
        </div>
      </div>
      <div className="text-8xl">{key} </div>
    </div>
  );
}
