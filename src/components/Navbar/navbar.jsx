import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LocalStorage from '../../services/Storage';
import { useSnackbar } from 'notistack';
import { logoutUser, deleteUser } from '../../store/actions/authentication';

const Navbar = props => {
    const [auth, setAuth] = useState(false);
    // snackbar errors
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        let response = LocalStorage.readTokenStorage();
        if(response) setAuth(true);
        if(props.session.error) enqueueSnackbar(props.session.error);
    }, []);

    return (
        <div className="nav-container">

            <ul className="navbar">
                {auth ? (
                    <li className="logout" >
                        <div onClick={() => {props.logoutUser(); setAuth(false)}}>
                            <img src={require('./icons/logout.svg')} alt="logout" />
                        </div>
                        <div onClick={() => {props.deleteUser(props.username); setAuth(false)}}>
                            <img src={require('./icons/delete.svg')} alt="delete" />
                        </div>
                    </li>
                    
                ) : (
                    <li className="login">
                        <Link to='/login'>
                            <img src={require('./icons/login.svg')} alt="login" />
                        </Link>
                    </li>
                )}
                
                
                <li className="flag">
                    <img src={require('./icons/uk.svg')} alt="english" />
                </li>
                <li className="flag">
                    <img src={require('./icons/spain.svg')} alt="spanish" />
                </li>
                <li className="flag">
                    <img src={require('./icons/italy.svg')} alt="italian" />
                </li>
            </ul>

        </div>
    )
}

const mapStateToProps = state => ({ session: state.session })

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    deleteUser: username => dispatch(deleteUser(username)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)