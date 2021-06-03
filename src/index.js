import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import GamePage from './game';
import DataAnalysis from './dataAnalysis';
import { HashRouter, Route, Redirect } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route path="/" exact component={GamePage}></Route>
      <Route path="/dataAnalysis" exact component={DataAnalysis}></Route>
      <Redirect to="/" from='*'/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
