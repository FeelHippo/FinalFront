import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostLogin } from '../../store/actions/authentication';
import { useTranslation } from 'react-i18next';

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
            <div className="container">
                <form onSubmit={submitForm} class="form" >
                    <h1>{t('login.title')}</h1>

                    <input type="text" {...bindUsername} placeholder={t('login.username')} />
                    
                    <input type="password" {...bindPassword} placeholder={t('login.password')}/>
                    
                    <button type='submit' class='success'>{t('login.enter')}</button>
                    <Link to='/signup'>
                        <button class='warning'>{t('login.not_registered')}</button>
                    </Link>
                    <Link to='/password'>
                        <button class='warning'>{t('login.forgot_password')}</button>
                    </Link>
                    <Link to='/'>
                        <button class='error'>{t('login.anonymous')}</button>
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