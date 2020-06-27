import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LocalStorage from '../../services/Storage';
import { logoutUser } from '../../store/actions/authentication';

const Navbar = props => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        let response = LocalStorage.readTokenStorage();
        if(response) setAuth(true);
    }, []);

    return (
        <div className="nav-container">

            <ul className="navbar">
                {auth ? (
                    <li className="logout" onClick={() => {props.logoutUser(); setAuth(false)}}>
                        <img src={require('./icons/logout.svg')} alt="logout" />
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

const mapStateToProps = state => {
    return state.session
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)