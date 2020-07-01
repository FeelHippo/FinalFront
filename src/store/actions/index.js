import { home, details, shared, messaging } from '../types/types';
import io from 'socket.io-client';
import uniqid from 'uniqid';
import api from '../../services/itemService';

const { getTags, getAds, getAd, postAd, modifyAd, deleteAd, getInitialAds, registeredUser, getAdsRegisteredUser } = api();

const { GET_ALL_TAGS,
        TAGS_LOAD_SUCCESS, 
    } = home;
const { USER_SEARCH,
        CREATE_AD, 
        CHANGE_AD 
    } = details;
const { UPDATE_FIELD, REDIRECT } = shared;
const { UPDATE_MESSAGE_HISTORY,
        CLIENT_ID,
        MESSAGE_TYPE,
        SET_CONNECTION_STATUS
} = messaging;

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
                    user: result.user,
                    tag1: result.tags[0],
                    tag2: result.tags[1],
                    _id: adId,
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    photo: result.photo,
                    type: result.type,
                    reserved: result.reserved || false,
                    sold: result.sold || false,
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
            if (!response._id) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(changeAdSuccess(response))
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

// delete element, and redirect ui when done
export const deleteItem = detId => {
    return async dispatch => {
        try {
            let response = await deleteAd(detId);

            if (!response.success) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(redirectAfterLoading(true))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// socket.IO connection set up 
const socket = io('http://localhost:5000/');

// socket.IO action creators
export const listenConnectionChange = () => {
    return async dispatch => {
        try {
            socket.on('connect', () => {
                dispatch(connectionChanged(true))
            })
            socket.on('disconnect', () => {
                dispatch(connectionChanged(false))
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const connectionChanged = status => ({
    type: SET_CONNECTION_STATUS,
    payload: status
}) 

export const sendMessage = ({ message, username }) => {
    const messageTemplate = {
        message: message,
        type: messaging.MESSAGE_TYPE.SENT,
        receiverId: username,
        timestamp: Date.now(),
        id: uniqid()
    }
    return async dispatch => {
        try {
            await socket.emit('message', messageTemplate, () => {
                console.log('emit message');
                dispatch(dispatchMessage(messageTemplate))
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const dispatchMessage = messageTemplate => ({
    type: UPDATE_MESSAGE_HISTORY,
    payload: messageTemplate
});

export const listenForIncomingMessage = () => {
    return async dispatch => {
        try {
            socket.on('message', message => {
                dispatch(inboundMessage(message))
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const inboundMessage = message => ({
    type: UPDATE_MESSAGE_HISTORY,
    payload: message
})



