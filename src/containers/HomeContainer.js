import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    searchAds,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {

    searchAds = () => {
        const { tag1,
                tag2,
                name,
                price_low,
                price_high,
                description,
                photo,
                type 
        } = this.props.user_search;
        this.props.searchAds(name, price_low.toString(),price_high.toString(), description, photo, type, [tag1, tag2])
    }

    render() {
        if(localStorage.length===0){
            return <Redirect to={'/'} />
        }
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

const mapDispatchToProps = {
    searchAds,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassifiedAds)