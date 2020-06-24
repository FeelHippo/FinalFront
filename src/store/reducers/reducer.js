import { reducer as formReducer } from 'redux-form';
import { home, details, auth, shared } from '../types/types';

import Session from '../../models/Session';
import Ad from '../../models/Ad';

const defaultState = {
    session: new Session(),
    valid_tags: [],
    ads: [],
    user_search: new Ad(),
    redirect: false,
}

// redux-form reducer should always be injected into combineReducers(), see ./store/config.js:24 and 31
export const form = formReducer;

export const session = (state = defaultState.session, action) => {
    switch (action.type) {
        case auth.SIGNUP_USER:
            return { 
                ...state, 
                success: action.payload }
        
        case auth.LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            }

        case shared.ERROR:
            return {
                ...state,
                success: action.payload.success,
                error: action.payload.msg,
            }

        case auth.LOGOUT_USER: 
            return new Session()

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

export const user_search = (state = defaultState.user_search, action) => {
    switch (action.type) {
        case shared.UPDATE_FIELD:
            const { field, value } = action.payload;
            return {
                ...state, 
                [field]: value
            }

        case details.GET_AD:
            return action.payload;

        case details.CREATE_AD:
            return {
                ...state, 
                ...action.payload
            }

        case details.CHANGE_AD:
            return state.map(ad => 
                ad._id === action.payload._id ? action.payload : ad
            )
    
        default:
            return state;
    }
}

export const ads = (state = defaultState.ads, action) => {
    
    switch (action.type) {
        
        case home.SEARCH_ADS:
            return action.payload;
    
        default:
            return state;
    }
}

export const redirect = (state = defaultState.redirect, action) => {
    if (action.type === shared.REDIRECT) {
        return action.payload;
    }
    return state;
}