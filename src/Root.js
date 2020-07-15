import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import '@brainhubeu/react-file-input/dist/react-file-input.css';

import App from './components/App';
import './i18n';

const Root = ({ store, history, ...props }) => (
    <Provider store={store}>
        <Router history={history}>
            <SnackbarProvider maxSnack={3}>
                <Suspense fallback={null}>
                    <App {...props} />
                </Suspense>
            </SnackbarProvider>
        </Router>
    </Provider>
)

export default Root;