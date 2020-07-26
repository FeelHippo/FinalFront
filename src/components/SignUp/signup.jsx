import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostSignup, clearSnackbar } from '../../store/actions/authentication';
import { useTranslation } from 'react-i18next';
// custom input hook
import { useInput } from '../Hooks/input-hook';
import './signup.scss';

const SignUp = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');
    // snackbar errors
    const { enqueueSnackbar } = useSnackbar();
    // translation
    const { t } = useTranslation();

    useEffect(() => {
        if(props.snackbar.message) {
            enqueueSnackbar(props.snackbar.message);
            props.clearSnackbar();
        }
    }, [props, enqueueSnackbar])

    const submitForm = evt => {
        evt.preventDefault();
        // redux authentication.js action
        props.userPostSignup({
            username,
            email,
            password,
        }).then(response => {
            if (response===true) {
                setRedirect(true);
            }  
        })
    };

    return(
        <>  {redirectPage ? <Redirect to='/login' /> : null}
            <div class="container">
                <form onSubmit={submitForm} class="formSignup">
                    <h3>{t('signup.title')}</h3>
                    <section className="inputs">
                        <input type="text" {...bindUsername} placeholder={t('signup.username')} />

                        <input type="email" {...bindEmail} placeholder={t('signup.email')} />

                        <input type="password" {...bindPassword} placeholder={t('signup.password')}/>
                    </section>
                    <section className="buttons">
                        <button type='submit' class="success">{t('signup.register')}</button>
                        <Link to='/login'>
                            <button class="warning">{t('signup.registered')}</button>
                        </Link>
                        <Link to='/'>
                            <button class='error'>{t('signup.anonymous')}</button>
                        </Link>
                    </section>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => { 
    return {
        redirect: state.redirect,
        snackbar: state.snackbar,
    } 
}

const mapDispatchToProps = dispatch => ({
    userPostSignup: userInfo => dispatch(userPostSignup(userInfo)),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);