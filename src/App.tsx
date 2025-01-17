import { useState } from 'react';
import NavBar from './components/NavBar';
import Game from './components/Game';

function App() {
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

export default App;
