import { reducer as formReducer } from 'redux-form';
import { home, details, auth, shared, messaging } from '../types/types';

import Session from '../../models/Session';

const defaultState = {
    session: new Session(),
    valid_tags: [],
    ads: [],
    snackbar: {},
    chat: {
        messages: [],
        connectionStatus: false,
        typist:null
    }
}

// redux-form reducer should always be injected into combineReducers(), see ./store/config.js:24 and 31
export const form = formReducer;

export const session = (state = defaultState.session, action) => {
    switch (action.type) {
        case auth.SIGNUP_USER:
            return { 
                ...state, 
                success: action.payload,
            }
        
        case auth.LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            }

        case auth.LOGOUT_USER: 
        return {
            ...state,
            ...new Session()
        }

        case home.TAGS_LOAD_SUCCESS:
            return state;
    
        default:
            return state;
    }
}

export const valid_tags = (state = defaultState.valid_tags, action) => {
    if (action.type === home.GET_ALL_TAGS) {
        return action.payload.data;
    }
    return state;
}

export const ads = (state = defaultState.ads, action) => {
    
    switch (action.type) {

        case home.FETCH_ADS:
            return action.payload

        case details.CREATE_AD:
            return {
                ...state,
                ...action.payload
            }

        case details.CHANGE_AD:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state;
    }
}

export const chat = (state = defaultState.chat, action) => {
    switch (action.type) {
        case messaging.UPDATE_MESSAGE_HISTORY:
            const temp = [...state.messages, action.payload];
            return {
                ...state,
                messages: temp,
            }
        case messaging.IS_TYPING:
            return {
                ...state,
                typist: action.payload
            }
        case messaging.NOT_TYPING:
            return {
                ...state,
                typist: action.payload
            }
        case messaging.SET_CONNECTION_STATUS:
            return { ...state, connectionStatus: action.payload }
        default:
            return state
    }
}

export const snackbar = (state = defaultState.snackbar, action) => {
    switch (action.type) {
        case shared.SNACKBAR_SUCCESS:
          return {
            ...state,
            message: action.message,
          };
        case shared.SNACKBAR_CLEAR:
          return {
            ...state,
            message: undefined,
          };
        default:
          return state;
    }
}