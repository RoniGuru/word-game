import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import GameContainer from '../components/GameContainer';
import Menu from '../components/Menu';

export default function HomePage() {
  const game = useSelector((state: RootState) => state.game.gameState);
  return (
    <>
      {game.on ? (
        game.start ? (
          <GameContainer />
        ) : (
          <Menu />
        )
      ) : (
        <div className="h-full w-full bg-black"></div>
      )}
    </>
  );
}
