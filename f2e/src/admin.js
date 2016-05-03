require('antd/lib/index.css');
require('./scss/admin.scss')
import React from 'react';
import ReactDom from 'react-dom';
import App from './containers/adminApp.js';
ReactDom.render(<App/>, document.getElementById('root'));