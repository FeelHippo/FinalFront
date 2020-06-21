import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getAllTags,
    searchAds,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        this.props.getAllTags();
    }

    searchAds = () => {
        const { name, price_low, price_high, sale, tag } = this.props;
        this.props.searchAds(name, price_low.toString(), price_high.toString(), tag, sale)
    }

    render() {
        if(localStorage.length===0){
            return <Redirect to={'/'} />
        }
        return (
            <Home
                { ...this.props }
                searchAds={ this.searchAds } 
                updateField={ this.updateField }
            />
        )
    }
}

const mapStateToProps = state => {
    return state.home
}

const mapDispatchToProps = {
    getAllTags,
    searchAds,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassifiedAds)