import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { backToStart } from '../state/game/gameSlice';

export default function EndScreen({
  playGame,
  selectedCategory,
}: {
  playGame: (category: string, words: string[]) => void;
  selectedCategory: string;
}) {
  const wordBanks = useSelector((state: RootState) => state.wordBank);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex  flex-col justify-center   text-center w-1/4 text-2xl  ">
        <button
          onClick={() =>
            playGame(selectedCategory, wordBanks[selectedCategory])
          }
          className="menuButton "
        >
          play the game again
        </button>
        <button onClick={() => dispatch(backToStart())} className="menuButton ">
          back to start
        </button>
      </div>
    </>
  );
}
