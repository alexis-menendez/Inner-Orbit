import './index.css';
import './styles/index.css'; // Tailwind base styles

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from './graphql/client'; // Apollo client setup
import router from './router'; //  custom router config
import AuthProvider from './context/AuthProvider'; // Auth context
// import App from './App'; //  not needed because router wraps it

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
