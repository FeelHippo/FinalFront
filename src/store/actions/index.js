import { home, details, shared, auth } from '../types/types';
import api from '../../services/itemService';
import Ad from '../../models/Ad';
const { getTags, getAds, getAd, postAd, modifyAd, getInitialAds, registeredUser, getAdsRegisteredUser } = api();

const { MOST_RECENT,
        GET_ALL_TAGS,
        TAGS_LOAD_SUCCESS, 
        SEARCH_ADS, 
    } = home;
const { USER_SEARCH,
        GET_AD, 
        CREATE_AD, 
        CHANGE_AD 
    } = details;
const { UPDATE_FIELD, REDIRECT } = shared;

// global action creators
export function updateField(evt) {
    const update = {
        field: evt.target.name,
        value: evt.target.value,
    }

    if(update.value === 'true' || update.value === 'false') {
        update.value = update.value === 'true' ? true : false
    }

    return {
        type: UPDATE_FIELD,
        payload: update,
    }
}

export function redirectAfterLoading(response) {
    return {
        type: REDIRECT,
        payload: response,
    }
}

// error handler
const showMessage = data => ({
    type: 'ERROR',
    payload: data,    
})

// action creators for home page
export const getAllTags = () => {
    return async dispatch => {
        try {
            await getTags().then(tags_api => dispatch(getHomeTags(tags_api))).then(() => dispatch(confirmTransaction()))
        } catch (error) {
            console.log(error);
        }
        return 'done';
    }
}

const confirmTransaction = () => ({
    type: TAGS_LOAD_SUCCESS,
})

const getHomeTags = tags_api => ({
    type: GET_ALL_TAGS,
    payload: tags_api,
});

// data fetch action creators
export const searchAds = (name, price_low, price_high, type, tags) => {
    return async dispatch => {
        try {
            let API_ARGS = `?${name ? `&name=${name}` : ''}${price_low > 0 ? `&price_low=${price_low}` : ''}${price_high > price_low ? `&price_high=${price_high}` : ''}${tags ? `&tags=["${tags[0]}", "${tags[1]}"]` : ''}${type ? `&type=true` : '&type=false'}`;
            await getAds(API_ARGS).then(results => dispatch(fetchAds(results)))
        } catch (error) {
            console.log(error);            
        }
        return 'done';
    }
}

export const getDefaultAds = () => {
    return async dispatch => {
        try {
            await getInitialAds().then(ads => dispatch(fetchAds(ads)))
        } catch (error) {
            
        }
    }
}

export const getUserAds = username => {
    return async dispatch => {
        try {
            let response = await getAdsRegisteredUser(username);
            
            if (!response) {
                dispatchEvent(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(fetchAds(response))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// action creator for detail cards
export const getOneAd = adId => {
    return async dispatch => {
        try {
            await getAd(adId).then(result => {

                let userAd = {
                    _id: adId,
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    photo: result.photo,
                    type: result.type,
                    tag1: result.tags[0],
                    tag2: result.tags[1],
                }
                dispatch(fetchAds(userAd))
            })
        } catch (error) {
            console.log(error);
        }
        return 'done';
    }
}

const fetchAds = ads => ({
    type: 'FETCH_ADS',
    payload: ads,
})



export const searchUser = user => {
    return async dispatch => {
        try {
            let response = await registeredUser(user);
            if (!response._id) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(userExists(response.username));
                dispatch(redirectAfterLoading(true));
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

const userExists = user => ({
    type: USER_SEARCH,
    payload: user,
})

export const createAd = adData => {
    return async dispatch => {
        try {
            let response = await postAd(adData);
            if (!response._id) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(createAdSuccess(response))
                return true;
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const createAdSuccess = result => ({
    type: CREATE_AD,
    payload: result,
})

export const changeAd = adData => {
    return async dispatch => {
        try {
            let response = await modifyAd(adData);
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', response)
            if (!response._id) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(changeAdSuccess(response));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const changeAdSuccess = result => ({
    type: CHANGE_AD,
    payload: result,
})
