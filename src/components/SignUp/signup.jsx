import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostSignup } from '../../store/actions/authentication';

// custom input hook
import { useInput } from '../Hooks/input-hook';

const SignUp = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPostSignup({
            username,
            email,
            password,
        })

        if(props.error) enqueueSnackbar(props.error);
        setRedirect(props.success);
    };

    return(
        <>  {redirectPage ? <Redirect to='/login' /> : null}
            <div class="container">
                <form onSubmit={submitForm} class="form">
                    <h1>New User</h1>

                    <input type="text" {...bindUsername} placeholder="choose a username" />

                    <input type="email" {...bindEmail} placeholder="register your e-mail" />
                    
                    <input type="password" {...bindPassword} placeholder="choose your password"/>
                    

                    <button type='submit' class="success">Register</button>
                    <Link to='/login'>
                        <button class="warning">I am registered</button>
                    </Link>
                    <Link to='/'>
                        <button class='error'>No, Thanks</button>
                    </Link>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return state.session
}

const mapDispatchToProps = dispatch => ({
    userPostSignup: userInfo => dispatch(userPostSignup(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);