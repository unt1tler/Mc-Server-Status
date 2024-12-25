import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import App from './App';
import { ServerDetails } from './routes/ServerDetails';
import { AddServer } from './routes/AddServer';
import { AuthCallback } from './routes/auth/callback';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/server/:id',
    element: <ServerDetails />,
  },
  {
    path: '/add-server',
    element: <AddServer />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);