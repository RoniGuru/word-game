import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function CreateWordBankPage() {
  const game = useSelector((state: RootState) => state.game.gameState);
  return <div className="gameContainer">create word</div>;
}
