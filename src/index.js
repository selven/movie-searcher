import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBox from './SearchBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SearchBox />, document.getElementById('root'));
registerServiceWorker();