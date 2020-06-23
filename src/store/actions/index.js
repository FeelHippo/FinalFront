import { home, details, shared, auth } from '../types/types';
import api from '../../services/itemService';
const { getTags, getAds, getDetail, postAd, modifyAd } = api();

const { GET_ALL_TAGS,
        TAGS_LOAD_SUCCESS, 
        SEARCH_ADS, 
    } = home;
const { GET_AD, 
        CREATE_AD, 
        CHANGE_AD 
    } = details;
const { UPDATE_FIELD } = shared;

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
            let API_ARGS = `?${type ? `type=true` : `type=false`}${name.length ? `&name=${name}` : ''}${price_low > 0 ? `&price=${price_low}` : ''}${price_high > price_low ? `&price=${price_high}` : ''}${description.length ? `&description=${description}` : ''}${photo.length ? `&photo=${photo}` : ''}${tags.length ? `&tags=["${tags[0]}", "${tags[1]}"]` : ''}`;
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
export const getAd = adId => {
    return async dispatch => {
        try {
            await getDetail(adId).then(result => dispatch(getAdDetails(result)))
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
            let backEndResponse;
            await modifyAd(adData).then(result => {
                backEndResponse = result;
                dispatch(changeAdSuccess(result));
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const changeAdSuccess = result => ({
    type: CHANGE_AD,
    payload: result.success,
})
