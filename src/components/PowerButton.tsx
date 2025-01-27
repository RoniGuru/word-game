import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { turnOnOff } from '../state/game/gameSlice';

export default function PowerButton() {
  const on = useSelector((state: RootState) => state.game.gameState.on);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() => {
        if (on) {
          dispatch(turnOnOff(false));
        } else {
          dispatch(turnOnOff(true));
        }
      }}
      className={`
      relative
      w-32 h-32
      rounded-full 
      flex items-center justify-center 
      transition-all duration-300
      ${
        on
          ? 'bg-gradient-to-b from-red-500 to-red-700'
          : 'bg-gradient-to-b from-gray-700 to-gray-900'
      }
      ${on ? 'shadow-inner scale-95' : 'shadow-lg hover:scale-105'}
      transform
    `}
      aria-label="Power button"
    >
      {/* Outer ring glow */}
      <div
        className={`
      absolute inset-0 rounded-full
      transition-opacity duration-300
      ${on ? 'opacity-100' : 'opacity-0'}
      bg-red-500 blur-lg
    `}
      />

      {/* Inner shadow overlay */}
      <div
        className="
      absolute inset-0 rounded-full
      bg-gradient-to-b from-transparent via-black/5 to-black/20
    "
      />

      {/* Highlight edge */}
      <div
        className="
      absolute inset-0 rounded-full
      bg-gradient-to-b from-white/20 to-transparent
      h-1/2
    "
      />

      {/* Power icon */}
      <div
        className={`
      relative
      w-16 h-16 
      flex items-center justify-center
      transition-all duration-300
      ${on ? 'text-white' : 'text-gray-300'}
      ${on ? 'scale-90' : 'scale-100'}
    `}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`
          w-full h-full
          transition-transform duration-300
          ${on ? 'opacity-100' : 'opacity-80'}
        `}
        >
          <path
            d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}
