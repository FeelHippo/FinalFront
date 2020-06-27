import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Root from './Root';
import { createBrowserHistory } from 'history';
import LocalStorage from './services/Storage';
import api from './services/itemService.js';
import { getAllTags } from './store/actions/index';
import { configureStore } from './store/config.js';
import { home, auth } from './store/types/types';

// render function
const renderApp = props => 
  ReactDOM.render(<Root {...props} />, document.getElementById('root'));

// browser history
const history = createBrowserHistory();

// localStorage query
const session = LocalStorage.readLocalStorage() || undefined;

// store config
const store = configureStore({
  history,
  services: { api },
})({
  session,
})

// sync store, update in case of changes
store.subscribe(() => {
  const { lastAction, session } = store.getState();
  if (lastAction.type === auth.LOGIN_USER && session.token) {
    console.log(session)
    LocalStorage.saveLocalStorage(session);
  }

  if (lastAction.type === auth.LOGOUT_USER) {
    LocalStorage.clearLocalStorage();
  }

  // render app when tags loaded
  if (lastAction.type === home.TAGS_LOAD_SUCCESS) {
    renderApp({ store, history })
  }
})

// launch initial action to load tags
store.dispatch(getAllTags());