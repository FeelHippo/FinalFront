import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUserAds
} from '../store/actions/index';

import UserAdsSection from '../components/UserAds/displayUserAds';

export class UserAdsContainer extends Component {
    componentDidMount() {
        // fetch ads
        const {match: { params }} = this.props;
        this.props.getUserAds(params.username)
    }

    render() {
        return <UserAdsSection 
            ads={ this.props.ads }
            user={ this.props.match.params.username }
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
        getUserAds: username => dispatch(getUserAds(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdsContainer);