import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import GamePage from './game';
import DataAnalysis from './dataAnalysis';
import { HashRouter, Route, Redirect } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

//多语言准备
import i18n from 'i18next';
import resources from './langpack';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: 'en',
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  detection:{
    order: ['querystring','navigator'],
    lookupQuerystring: 'language',
    caches:[]
  }
}).then(t=>{
  document.title=t('Minesweeper');
});

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
