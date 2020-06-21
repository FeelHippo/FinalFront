import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './components/App';
import './index.css';

const Root = ({ store, history, ...props }) => (
    <Provider store={store}>
        <Router history={history}>
            <SnackbarProvider maxSnack={3}>
                <App {...props} />
            </SnackbarProvider>
        </Router>
    </Provider>
)

export default Root;