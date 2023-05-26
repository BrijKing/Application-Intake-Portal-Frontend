import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <GoogleOAuthProvider clientId='410296848678-tna7um8elbvpebivg8gsm57j2g3p57et.apps.googleusercontent.com'>
      <App /> 
      </GoogleOAuthProvider>
      
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

