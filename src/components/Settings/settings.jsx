import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
// auth + fetch actions
import { userPutUpdate } from '../../store/actions/authentication';
import { getUserAds } from '../../store/actions/index';

// custom input hook
import { useInput } from '../Hooks/input-hook';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

const Settings = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value:username, bind:bindUsername } = useInput('');
    const { value:email, bind:bindEmail } = useInput('');
    const { value:password, bind:bindPassword } = useInput('');

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const ownAds = async username => {
            await props.getUserAds(username);
        }
        if(props.session.username) ownAds(props.session.username);
    }, [])

    const submitForm = evt => {
        evt.preventDefault();
        
        props.userPutUpdate({
            _id: props.session._id,
            username,
            email,
            password,
        })

        if(props.session.error) enqueueSnackbar(props.session.error);
        setRedirect(props.session.success);
    };

    return(
        <>  {redirectPage ? <Redirect to='/login' /> : null}
            <div class="container">
                <form onSubmit={submitForm} class="form">
                    <h1>Account Settings</h1>

                    <input type="text" {...bindUsername} placeholder={props.session.username} />

                    <input type="email" {...bindEmail} placeholder={props.session.email} />
                    
                    <input type="password" {...bindPassword} placeholder={props.session.password} />
                    

                    <button type='submit' class="success">Update</button>
                    <Link to='/login'>
                        <button class="warning">Login</button>
                    </Link>
                    <Link to='/'>
                        <button class='error'>No, Thanks</button>
                    </Link>
                    <section>
                        <h1>Manage Your Ads</h1>
                        {
                            props.ads.length ? (
                                <List
                                    items={props.ads}
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
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        session: state.session,
        ads: state.ads,
    }
}

const mapDispatchToProps = dispatch => ({
    userPutUpdate: userInfo => dispatch(userPutUpdate(userInfo)),
    getUserAds: username => dispatch(getUserAds(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);