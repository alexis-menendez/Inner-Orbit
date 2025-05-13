// File: client/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
