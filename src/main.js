import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from './state-manager/react-connect';

import store from './store';
import App from './components/App';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
