import api from '../../services/itemService';
const { loginUser, registerUser, updateUser, tokenAuthentication, retrievePassword, deleteUserAccount } = api();

export const userPostLogin = user => {
    return async dispatch => {

        try {
            // if status 200, receive used object
            let response = await loginUser(user);
            let token = response.data.token;
            // if token is valid, receive true
            let authenticated = await tokenAuthentication(token);
            // store token in LocalStorage, validity is 7 days
            if (authenticated && response.status === 200) {
                localStorage.setItem('x-auth-token', token);
                // dispatch login if status 200
                dispatch(loginAuthUser(response.data));
            } else {
                dispatch(showMessage(response.data))
            }
            
        } catch (error) {
            console.log(error);
        }

        return 'done';
    }
}

const loginAuthUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj,
})

// signup or update user data
export const userPostSignup = user => {
    return async dispatch => {
        
        try {
            // receive true if user registered
            let response = await registerUser(user)
            if (response.status === 200) {
                dispatch(signupUser(response.data.success))
            } else {
                dispatch(showMessage(response.data))
            }
        } catch (error) {
            console.log(error);
        }

        return 'done';
    }
}

export const userPutUpdate = user => {
    return async dispatch => {

        try {
            // receive true if user updated
            let response = await updateUser(user);
            if (response.status === 200) {
                dispatch(signupUser(response.data.success))
            } else {
                dispatch(showMessage(response.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const signupUser = success => ({
    type: 'SIGNUP_USER',
    payload: success,
})

export const sendEmail = email => {
    return async dispatch => {

        try {
            let response = await retrievePassword(email);
            if(!response.success) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(redirectAfterLoading(true))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteUser = username => {
    return async dispatch => {

        try {
            let response = await deleteUserAccount(username);
            if(!response) {
                dispatch(showMessage({ msg: response.msg, success: false }))
            } else {
                dispatch(logoutUser())
                dispatch(showMessage({ msg: response.msg, success: true }))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER',
    }
}

// error handler
const showMessage = data => ({
    type: 'ERROR',
    payload: data,    
})

const redirectAfterLoading = response => ({
        type: 'REDIRECT',
        payload: response,
})

// inside the individual components, if there is a state.msg, use snackbar to print it
// amend userPostLogin to di the same