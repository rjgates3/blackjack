import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import { ContextProvider } from '../src/context/context'

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>
, document.getElementById('root'));

