import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostLogin } from '../../store/actions/authentication';

// custom input hook
import { useInput } from '../Hooks/input-hook';

const Login = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');
    // snackbar errors
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPostLogin({
            username,
            password,
        })
        if(props.session.error) enqueueSnackbar(props.session.error);
        setRedirect(props.session.success);
    };
    
    return (
        <>  {redirectPage ? <Redirect to='/'/> : null }
            <div class="container">
                <form onSubmit={submitForm} class="form" >
                    <h1>Login</h1>

                    <input type="text" {...bindUsername} placeholder="enter your username" />
                    
                    <input type="password" {...bindPassword} placeholder="... and your password"/>
                    
                    <button type='submit' class='success'>Go!</button>
                    <Link to='/signup'>
                        <button class='warning'>I am not registered</button>
                    </Link>
                    <Link to='/password'>
                        <button class='warning'>I forgot my password</button>
                    </Link>
                    <Link to='/'>
                        <button class='error'>continue without login</button>
                    </Link>
                    
                </form>
            </div>        
        </>

    )

}

const mapStateToProps = state => ({ session: state.session })

const mapDispatchToProps = dispatch => ({
    userPostLogin: userInfo => dispatch(userPostLogin(userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)