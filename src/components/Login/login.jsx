import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userPostLogin } from '../../store/actions/authentication';

// custom input hook
import { useInput } from '../Hooks/input-hook';

const Login = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPostLogin({
            username: email,
            password: password
        })

        setRedirect(props.success);
    };
    
    return (
        <>  {redirectPage ? <Redirect to='/ads'/> : null }
            <div class="nes-container with-title is-centered">
                <p class="title nes-text is-warning">Please login</p>
                <form onSubmit={submitForm} class="nes-field" >
                    <h1 class="nes-text is-primary">Old Pal</h1>

                    <label class="nes-text is-primary">
                        eM@ail:
                        <input type="email" class="nes-input" {...bindEmail} />
                    </label>

                    <label class="nes-text is-primary">
                        password:
                        <input type="password" class="nes-input" {...bindPassword} />
                    </label>

                    <button type='submit' class="nes-btn is-primary">Login</button>
                    <Link to='/signup'>
                        <button class="nes-btn is-warning">I am not registered</button>
                    </Link>
                </form>
            </div>        
        </>

    )

}

const mapStateToProps = state => {
    return state.session;
}

const mapDispatchToProps = dispatch => ({
    userPostLogin: userInfo => dispatch(userPostLogin(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)