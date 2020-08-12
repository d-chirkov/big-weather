/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App.view';

/* eslint-enable @typescript-eslint/no-unused-vars */

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});