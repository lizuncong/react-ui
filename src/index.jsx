import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './style/common.less';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router />,
  rootElement,
);
