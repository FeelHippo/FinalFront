import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withSnackbar } from 'notistack';
import {
    getUserAds,
    clearSnackbar,
} from '../store/actions/index';

import UserAdsSection from '../components/UserAds/displayUserAds';

export class UserAdsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    componentDidMount() {
        // fetch ads
        const {match: { params }} = this.props;
        this.fetchUserAds(params.username);
        // snackbar errors
        if(this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
    }

    fetchUserAds = username => {
        this.props.getUserAds(username);
    };

    redirectView = () => { 
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={`/`} />
        }
        return <UserAdsSection 
            ads={ this.props.ads }
            user={ this.props.match.params.username }
            navigateHome={ this.redirectView }
            t={ this.props.t }
        />
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAds: username => dispatch(getUserAds(username)),
        clearSnackbar: () => dispatch(clearSnackbar()),
    }
}

export default withSnackbar(withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(UserAdsContainer)
))