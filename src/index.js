import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import MyAuth0Provider from './contexts/MyAuth0Provider';
import { ThemeProvider } from './contexts/Theme.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyAuth0Provider>
    <ThemeProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </MyAuth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//import Koa from 'koa';
