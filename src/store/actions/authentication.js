import api from '../../services/itemService';
const { loginUser, registerUser } = api();

export const userPostLogin = user => {
    return async dispatch => {
        
        try {
            await loginUser(user).then(response => {
                localStorage.setItem('token', user.username);
                dispatch(loginAuthUser({...user, ...response}));
            }) // maybe a .catch in case of error, the front receives the email address, and password == '', redirect to login form with email and empty password
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
            await registerUser(user).then(response =>
                dispatch(signupUser(response))  
            )
            
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