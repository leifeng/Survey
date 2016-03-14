require('antd/lib/index.css');
require('dragula/dist/dragula.min.css');
require('./scss/index.scss')
import React from 'react';
import {render} from 'react-dom';
import App from './containers/app.js';
render(<App/>, document.getElementById('root'));