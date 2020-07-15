import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { sendEmail } from '../../store/actions/authentication';

import { useInput } from '../Hooks/input-hook';


const Password = props => {

    const { value:email, bind:bindEmail } = useInput('');
    const [redirectPage, setRedirect] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const ui = () => {
            if(props.redirect) {setRedirect(true)} 
            else if(props.session.error) {enqueueSnackbar(props.session.error)}
        }
        ui();
    })

    const submitRequest = email => {
        props.sendEmail(email);
    }

    return (
        <>  {redirectPage ? <Redirect to='/login' /> : null}
            <div class="container">
                <h2>Insert your email here</h2>
                <input type="email" {...bindEmail} placeholder="you will receive an email with your password" />
                <button type="button" class="success" onClick={() => submitRequest(email)}>Send</button>
                <Link to='/login'>
                    <button class='error'>No, Thanks</button>
                </Link>
            </div>

        </>
    ) 
}

const mapStateToProps = state => ({ 
    session: state.session,
    redirect: state.redirect,
})

const mapDispatchToProps = dispatch => ({ sendEmail: () => dispatch(sendEmail()) })

export default connect(mapStateToProps, mapDispatchToProps)(Password);