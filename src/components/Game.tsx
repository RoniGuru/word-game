import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import PowerButton from './PowerButton';
import GameContainer from './GameContainer';
import Menu from './Menu';

export default function Game() {
  const game = useSelector((state: RootState) => state.game.gameState);

  return (
    <div className="game flex justify-center items-center">
      <div className="flex flex-col h-full w-full justify-center items-center gap-10 text-center relative ">
        {game.on ? (
          <div className="relative bg-gray-800 rounded-lg p-8 shadow-2xl border-4 border-gray-700 h-4/5 w-4/5 flex justify-center">
            {game.start ? <GameContainer /> : <Menu />}
          </div>
        ) : (
          <div className="relative bg-gray-800 rounded-lg p-8 shadow-2xl border-4 border-gray-700 h-4/5 w-4/5 flex justify-center">
            <div className="h-full w-full bg-black"></div>
          </div>
        )}

        <PowerButton />
      </div>
    </div>
  );
}
