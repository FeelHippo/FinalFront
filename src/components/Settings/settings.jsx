import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
// auth + fetch actions
import { userPutUpdate, clearSnackbar } from '../../store/actions/authentication';
import { getUserAds } from '../../store/actions/index';

// custom input hook
import { useInput } from '../Hooks/input-hook';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

import './settings.scss';

const Settings = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');
    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    // translation
    const { t } = useTranslation();

    useEffect(() => {
        const ownAds = async username => {
            await props.getUserAds(username);
        }
        if(props.session.username) ownAds(props.session.username);
        // snackabar in case of error
        if(props.snackbar.message) {
            enqueueSnackbar(props.snackbar.message);
            props.clearSnackbar();
        }
    }, [props, enqueueSnackbar])

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPutUpdate({
            _id: props.session._id,
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
            <div class="containerSettings">
                <form onSubmit={submitForm} className="settingsForm">
                    <h1>{t('settings.title')}</h1>

                    <input type="text" {...bindUsername} placeholder={props.session.username} />

                    <input type="email" {...bindEmail} placeholder={props.session.email} />
                    
                    <input type="password" {...bindPassword} placeholder={props.session.password} />
                    

                    <button type='submit' class="success">{t('settings.update')}</button>
                    <Link to='/login'>
                        <button class="warning">{t('settings.login')}</button>
                    </Link>
                    <Link to='/'>
                        <button class='error'>{t('settings.back')}</button>
                    </Link>
                    <section className="personalAds">
                        <h1>{t('settings.manage')}</h1>
                        {
                            props.ads.items ? (
                                <List
                                    items={props.ads.items}
                                    renderItem={
                                        ad => (
                                            <Card {...ad} />
                                    )}
                                />
                            ) : (
                                <div></div>
                            )
                        }
                    </section>
                    <section class="favoriteAds">
                        <h1>{t('settings.favorite')}</h1>
                        {
                            !props.ads.favorites === [] ? (
                                <List
                                    items={props.ads.favorites}
                                    renderItem={
                                        ad => (
                                            <Card {...ad} />
                                    )}
                                />
                            ) : (
                                <div>{t('settings.no_results')}</div>
                            )
                        }
                    </section>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        session: state.session,
        ads: state.ads,
        snackbar: state.snackbar,
        redirect: state.redirect,
    }
}

const mapDispatchToProps = dispatch => ({
    userPutUpdate: userInfo => dispatch(userPutUpdate(userInfo)),
    getUserAds: username => dispatch(getUserAds(username)),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
