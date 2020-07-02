import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    getUserAds,
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
        />
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAds: username => dispatch(getUserAds(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdsContainer);