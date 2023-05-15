import { RequireAuth } from './contexts/Auth/RequireAuth';

import { MainRoutes } from './routes/MainRoutes';

import "./App.css"

function App() {
  return (
    <div className='App'>
      <RequireAuth>
        <MainRoutes />
      </RequireAuth>
    </div>
  );
}

export default App;
