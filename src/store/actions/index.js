import { home, details, shared, auth } from '../types/types';
import api from '../../services/itemService';
import Ad from '../../models/Ad';
const { getTags, getAds, getAd, postAd, modifyAd } = api();

const { GET_ALL_TAGS,
        TAGS_LOAD_SUCCESS, 
        SEARCH_ADS, 
    } = home;
const { GET_AD, 
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

const getHomeTags = tags_api => ({
    type: GET_ALL_TAGS,
    payload: tags_api,
});

const confirmTransaction = () => ({
    type: TAGS_LOAD_SUCCESS,
})

export const searchAds = (name, price_low, price_high, description, photo, type, tags) => {
    return async dispatch => {
        try {
            let API_ARGS = `?${name.length ? `&name=${name}` : ''}${price_low > 0 ? `&price_low=${price_low}` : ''}${price_high > price_low ? `&price_high=${price_high}` : ''}${description.length ? `&description=${description}` : ''}${photo.length ? `&photo=${photo}` : ''}${tags.length ? `&tags=["${tags[0]}", "${tags[1]}"]` : ''}${type ? `&type=true` : '&type=false'}`;
            await getAds(API_ARGS).then(results => dispatch(getHomeAds(results)))
        } catch (error) {
            console.log(error);            
        }
        return 'done';
    }
}

const getHomeAds = results => ({
    type: SEARCH_ADS,
    payload: results,
})

// action creators for detail cards
export const getOneAd = adId => {
    return async dispatch => {
        try {
            await getAd(adId).then(result => {

                let userAd = new Ad(
                    result.tags[0],
                    result.tags[1],
                    adId,
                    result.name,
                    undefined,
                    result.price,
                    result.description,
                    result.photo,
                    result.type
                )
                dispatch(getAdDetails(userAd))
            })
        } catch (error) {
            console.log(error);
        }
        return 'done';
    }
}

const getAdDetails = result => ({
    type: GET_AD,
    payload: result,
})

export const createAd = adData => {
    return async dispatch => {
        try {
            const result = await postAd(adData).then(result => dispatch(createAdSuccess(result)));
            return result;
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
            await modifyAd(adData).then(result => {
                dispatch(changeAdSuccess(result));
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const changeAdSuccess = result => ({
    type: CHANGE_AD,
    payload: result,
})
