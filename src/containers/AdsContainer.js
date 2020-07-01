import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getOneAd,
} from '../store/actions/index';
import LocalStorage from '../services/Storage';

import PrintDetail from '../components/Detail/detail';

export class AdDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            authenticated: false,
        }
    }

    componentDidMount() {
        const {match: { params }} = this.props; 
        this.getDetails(params.detId); 
        // authentication check
        const storageToken = LocalStorage.readTokenStorage();
        const storeToken = this.props.session.token;
        let authenticated = (storageToken === storeToken) ? true : false;
        this.setState({ authenticated });
    }

    getDetails = detId => {
        this.props.getOneAd(detId);
    } 

    render() {
        return (
            <PrintDetail 
                ad = { this.props.ads }
                _id={ this.props.match.params.detId }
                authenticated={ this.state.authenticated }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        session: state.session,
    }
}

const mapDispatchToProps = dispatch => ({ getOneAd: id => dispatch(getOneAd(id)) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdDetails)