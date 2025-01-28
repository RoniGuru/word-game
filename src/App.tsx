import { Provider } from 'react-redux';
import store from './state/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.tsx';
import CreateWordBankPage from './pages/CreateWordBank.tsx';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createWordBank" element={<CreateWordBankPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
