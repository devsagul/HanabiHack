import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'utils/serviceWorker';
import App from 'containers/app/App';
import './index.css';


ReactDOM.render(<App/>, document.getElementById('root'));

registerServiceWorker();
