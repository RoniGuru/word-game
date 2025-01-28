import { Provider } from 'react-redux';
import store from './state/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.tsx';
import CreateWordBankPage from './pages/CreateWordBank.tsx';
import RootLayout from './pages/RootLayout.tsx';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RootLayout>
                <HomePage />
              </RootLayout>
            }
          />
          <Route
            path="/createWordBank"
            element={
              <RootLayout>
                <CreateWordBankPage />
              </RootLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
