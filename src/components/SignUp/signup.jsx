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
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPostSignup({
            email,
            password,
        })
        
        if(props.error) enqueueSnackbar(props.error);
        setRedirect(props.success);
    };

    return(
        <>  {redirectPage ? <Redirect to='/' /> : null}
            <div class="nes-container with-title is-centered">
                <p class="title nes-text is-warning">Please register</p>
                <form onSubmit={submitForm} class="nes-field">
                    <h1 class="nes-text is-primary">New User</h1>

                    <label class="nes-text is-primary">
                        eM@ail:
                        <input type="email" class="nes-input" {...bindEmail} />
                    </label>

                    <label class="nes-text is-primary">
                        password:
                        <input type="password" class="nes-input" {...bindPassword} />
                    </label>

                    <button type='submit' class="nes-btn is-primary">Register</button>
                    <Link to='/'>
                        <button class="nes-btn is-warning">I am registered</button>
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