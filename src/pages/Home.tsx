import NavBar from '../components/NavBar';
import Game from '../components/Game';

export default function HomePage() {
  return (
    <div>
      <style>
        {`
           @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');
            `}
      </style>
      <NavBar />
      <Game />
    </div>
  );
}
