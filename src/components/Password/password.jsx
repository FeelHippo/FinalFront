import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { sendEmail, clearSnackbar } from '../../store/actions/authentication';
import { useTranslation } from 'react-i18next';
import './password.scss';

import { useInput } from '../Hooks/input-hook';


const Password = props => {

    const { value:email, bind:bindEmail } = useInput('');
    const [redirectPage, setRedirect] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // translation
    const { t } = useTranslation();

    useEffect(() => {
        const ui = () => {
            if(props.redirect) {setRedirect(true)} 
            else if(props.snackbar.message) {
                enqueueSnackbar(props.snackbar.message);
                props.clearSnackbar();
            }
        }
        ui();
    })

    const submitRequest = email => {
        props.sendEmail(email).then(response => {
            if (response===true) {
                setRedirect(true);
            }  
        })
    }

    return (
        <>  {redirectPage ? <Redirect to='/login' /> : null}
            <div class="containerPassword">
                <div className="passwordForm">
                    <h2>{t('password.insert_email')}</h2>
                    <input type="email" {...bindEmail} placeholder={t('password.placeholder')} />
                    <button type="button" class="success" onClick={() => submitRequest(email)}>{t('password.send')}</button>
                    <Link to='/login'>
                        <button class='error'>{t('password.denial')}</button>
                    </Link>
                </div>
            </div>

        </>
    ) 
}

const mapStateToProps = state => ({ 
    session: state.session,
    redirect: state.redirect,
    snackbar: state.snackbar,
})

const mapDispatchToProps = dispatch => ({ 
    sendEmail: () => dispatch(sendEmail()),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Password);