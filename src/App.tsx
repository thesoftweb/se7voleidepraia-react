import { useContext } from 'react';

import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';

import { MainRoutes } from './routes/MainRoutes';

import './App.css';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  }

  return (
    <div className="App">
      <header>
        <h1>Header do site</h1>
        <nav>

          {auth.user && <button onClick={handleLogout}>Sair</button>}
        </nav>
      </header>
      <hr />
      <RequireAuth>
        <MainRoutes />
      </RequireAuth>
    </div>
  );
}

export default App;
