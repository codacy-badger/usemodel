import React from 'react';
import ReactDOM from 'react-dom';
import { withUnidata } from '@datnq/unidata';

import './index.css';
import App from './App';

const AppContainer = withUnidata()(App);

ReactDOM.render(<AppContainer />, document.getElementById('root'));
