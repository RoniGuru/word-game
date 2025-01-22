interface PowerButtonProps {
  start: boolean;
  startGame: () => void;
  endGame: () => void;
}

export default function PowerButton({
  start,
  startGame,
  endGame,
}: PowerButtonProps) {
  return (
    <button
      onClick={() => {
        if (start) {
          endGame();
        } else {
          startGame();
        }
      }}
      className={`
w-24 h-24 
rounded-full 
flex items-center justify-center 
transition-all duration-300 
bg-red-500
hover:bg-red-700 
focus:outline-none 
focus:ring-4 
focus:ring-red-300
`}
      aria-label="Power button"
    >
      <div
        className={`
w-12 h-12 
flex items-center justify-center
text-white
transition-transform duration-300
opacity-90
`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-full h-full"
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
