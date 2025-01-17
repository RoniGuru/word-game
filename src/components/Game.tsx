import { useState, useEffect, useCallback } from 'react';

export default function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');

  const word: string = 'ring';

  const [solved, setSolved] = useState<string[]>([]);

  function createEmptyWord() {
    let array = [];
    for (let i = 0; i < word.length; i++) {
      array.push('_');
    }
    setSolved(array);
  }

  useEffect(() => {
    createEmptyWord();
  }, []);

  function isAlphabet(key: string): boolean {
    return /^[A-Za-z]$/.test(key);
  }

  const checkWord = useCallback(() => {
    let temp: string[] = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === key.toLowerCase()) {
        temp = [...solved];
        temp[i] = key.toLowerCase();
        setSolved(temp);
      }
    }
    let solvedWord = temp.join('');
    console.log(solvedWord);
    if (solvedWord === word) {
      console.log('solved');
    }
  }, [word, key, solved]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isAlphabet(event.key)) {
      setKey(event.key);
    }

    if (event.key === 'Enter' && key.length === 1) {
      console.log('checking word');
      checkWord();
    }
  };

  useEffect(() => {
    if (start) {
      // Add event listener when component mounts
      window.addEventListener('keypress', handleKeyPress);

      // Cleanup listener when component unmounts
      return () => {
        window.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [handleKeyPress]);

  return (
    <div className="game flex justify-center items-center">
      {start ? (
        <div className="flex flex-col h-full w-full justify-center items-center gap-10">
          <div className="gameContainer">
            <div className="flex flex-row gap-5 ">
              {solved.map((letter, index) => (
                <div className="text-8xl" key={index}>
                  {letter}
                </div>
              ))}
              {/* {word.split('').map((letter) => (
                <div className="text-8xl">{letter}</div>
              ))} */}
            </div>

            <div className="text-8xl">{key} this is the key</div>
          </div>
          <button
            className="startButton text-4xl w-1/12"
            onClick={() => {
              setStart(!start);
              createEmptyWord();
            }}
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
