import App from './App';
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/Auth/AuthProvider';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider></>
)

