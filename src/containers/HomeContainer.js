import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getDefaultAds,
    searchAds,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {

    componentDidMount() {
        this.props.getDefaultAds();
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
        // if(localStorage.length===0){
        //     return <Redirect to={'/login'} />
        // }
        return (
            <Home
                ads={ this.props.ads }
                searchAds={ this.searchAds }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        user_search: state.user_search,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        searchAds: params => dispatch(searchAds(params)),
        getDefaultAds: () => dispatch(getDefaultAds())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassifiedAds)