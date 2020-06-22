import { home, details, auth, shared } from '../types/types';

// const { GET_ALL_TAGS, 
//     SEARCH_ADS, 
//     SESSION_SAVE, 
//     SESSION_CLEAR, 
//     TAGS_LOAD_FAILURE 
// } = home;
// const { GET_AD, 
//     CREATE_AD, 
//     CHANGE_AD 
// } = details;
// const { UPDATE_FIELD } = shared;

import Session from '../../models/Session';
import Ad from '../../models/Ad';

const defaultState = {
    session: new Session(),
    valid_tags: [],
    ads: [],
    ui: {
        loading: false,
        error: null,
    },
}

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

export const ads = (state = defaultState.ads, action) => {
    switch (action.type) {
        case home.SESSION_CLEAR:
            return defaultState.ads;
        
        case details.GET_AD:
            return action.payload;

        case details.CREATE_AD:
            return [...state, action.payload]

        case details.CHANGE_AD:
            return state.map(ad => 
                ad._id === action.payload._id ? action.payload : ad
            )
    
        default:
            return state;
    }
}

