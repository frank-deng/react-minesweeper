import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './mainPage';
import GamePage from './game';
import { HashRouter, Route, Redirect } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route path="/" exact component={MainPage}></Route>
      <Route path="/game/:param" exact component={GamePage}></Route>
      <Redirect to="/" from='*'/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
