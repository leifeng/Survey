require('antd/lib/index.css');
require('dragula/dist/dragula.min.css');
require('./scss/admin.scss')
import React from 'react';
import {render} from 'react-dom';
import App from './containers/adminApp.js';
render(<App/>, document.getElementById('root'));