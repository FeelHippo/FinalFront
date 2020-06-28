import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
    getDefaultAds,
    searchAds,
    searchUser,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {

    componentDidMount() {
        this.props.getDefaultAds();
    }

    searchUser = async () => {
        const { user } = this.props.user_search;
        await this.props.searchUser(user).then(() => {
            if(this.props.user_search.success === false) {
                this.key = this.props.enqueueSnackbar(this.props.user_search.error);
            }
        })
    }

    searchAds = () => {
        const { tag1,
                tag2,
                name,
                price_low,
                price_high,type 
        } = this.props.user_search;
        this.props.searchAds(name, price_low.toString(),price_high.toString(), type, [tag1, tag2])
    }

    render() {
        if(this.props.redirect){
            return <Redirect to={`/${this.props.user_search.user}`} />
        }
        return (
            <Home
                ads={ this.props.ads }
                searchAds={ this.searchAds }
                searchUser={ this.searchUser }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        user_search: state.user_search,
        redirect: state.redirect,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        searchAds: params => dispatch(searchAds(params)),
        searchUser: user => dispatch(searchUser(user)),
        getDefaultAds: () => dispatch(getDefaultAds()),
    }
}

export default withSnackbar(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ClassifiedAds)
)
