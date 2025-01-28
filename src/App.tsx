import NavBar from './components/NavBar';
import Game from './components/Game';
import { Provider } from 'react-redux';
import store from './state/store.ts';

function App() {
  return (
    <Provider store={store}>
      <div>
        <style>
          {`
       @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');
        `}
        </style>
        <NavBar />
        <Game />
      </div>
    </Provider>
  );
}

export default App;
