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
                // let browser know session has started
                localStorage.setItem('x-auth-token', token);
                // dispatch login if status 200
                dispatch(loginAuthUser(response.data));
                // let component know result is positive
                dispatch(redirectAfterLoading(true));
            } else {
                dispatch(showSnackbar(response.data.msg))
            }
        } catch (error) {
            console.log(error);
        }
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
            await registerUser(user).then(response => {
                if (response.status === 200) {
                    // let component know result is positive
                    dispatch(signupUser(response.data.success));
                    dispatch(redirectAfterLoading(true));
                } else {
                    dispatch(showSnackbar(response.data.msg))
                }
            })
        
        } catch (error) {
            console.log(error);
        }
    }
}

export const userPutUpdate = user => {
    return async dispatch => {

        try {
            // receive true if user updated
            await updateUser(user).then(response => {
                if (response.status === 200) {
                    dispatch(signupUser(response.data.success));
                    dispatch(redirectAfterLoading(true));
                } else {
                    dispatch(showSnackbar(response.data.msg))
                }
            })            
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
                dispatch(showSnackbar(response.msg))
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
                dispatch(showSnackbar(response.msg))
            } else {
                dispatch(logoutUser())
                dispatch(showSnackbar(response.msg))
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
const showSnackbar = message => ({ 
    type: "SNACKBAR_SUCCESS", 
    message 
});

export const clearSnackbar = () => {
    return dispatch => {
      dispatch({ type: "SNACKBAR_CLEAR" });
    };
};

const redirectAfterLoading = response => ({
    type: 'REDIRECT',
    payload: response,
})
