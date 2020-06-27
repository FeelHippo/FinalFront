import api from '../../services/itemService';
const { loginUser, registerUser, tokenAuthentication } = api();

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

const signupUser = success => ({
    type: 'SIGNUP_USER',
    payload: success,
})

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

// inside the individual components, if there is a state.msg, use snackbar to print it
// amend userPostLogin to di the same