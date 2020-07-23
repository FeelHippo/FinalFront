import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostLogin, clearSnackbar } from '../../store/actions/authentication';
import { useTranslation } from 'react-i18next';
import './login.scss';

// custom input hook
import { useInput } from '../Hooks/input-hook';

const Login = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
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
        
        props.userPostLogin({
            username,
            password,
        })
        
        setRedirect(props.redirect);
    };
    
    return (
        <>  {redirectPage ? <Redirect to='/'/> : null }
            <div className="container">
                <form onSubmit={submitForm} className="formLogin" >
                    <h3>{t('login.title')}</h3>
                    <section className="inputs">
                        <input type="text" {...bindUsername} placeholder={t('login.username')} />
                        
                        <input type="password" {...bindPassword} placeholder={t('login.password')}/>
                        <button type='submit' class='success'>{t('login.enter')}</button>
                    </section>

                    <section className="buttons">
                        <Link to='/signup'>
                            <button class='warning'>{t('login.not_registered')}</button>
                        </Link>
                        <Link to='/password'>
                            <button class='warning'>{t('login.forgot_password')}</button>
                        </Link>
                        <Link to='/'>
                            <button class='error'>{t('login.anonymous')}</button>
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
    userPostLogin: userInfo => dispatch(userPostLogin(userInfo)),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)