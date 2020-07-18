import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import {
    updateField,
    getDefaultAds,
    searchAds,
    searchUser,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSearched: '',
            order: "new",
        }
    }

    componentDidMount() {
        this.props.getDefaultAds();
    }

    searchUser = async values => {
        let response = await this.props.searchUser(values.name);
        if(!response._id) {
            this.key = this.props.enqueueSnackbar(response.msg);
        } else {
            this.setState({
                userSearched: response.username,
            })
        }
    }

    searchAds = async values => {
        let response = await this.props.searchAds(values);
        if (response.msg) {
            this.key = this.props.enqueueSnackbar(response.msg);
        }
    }

    changeOrder = evt => {
        evt.preventDefault();
        this.setState({
            order: evt.target.value
        })
    }

    render() {
        if(this.props.redirect){
            return <Redirect to={`/${this.state.userSearched}`} />
        }
        return (
            <Home
                valid_tags={ this.props.valid_tags }
                ads={ this.props.ads }
                // oldFirst={ find a way to reorder ads here }
                searchAds={ this.searchAds }
                searchUser={ this.searchUser }
                changeOrder={ this.changeOrder }
                t={ this.props.t }
                order={ this.state.order }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        redirect: state.redirect,
        valid_tags: state.valid_tags,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        searchAds: params => dispatch(searchAds(params)),
        searchUser: user => dispatch(searchUser(user)),
        getDefaultAds: () => dispatch(getDefaultAds()),
        updateField: evt => dispatch(updateField(evt))
    }
}

export default withTranslation()(
    withSnackbar(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(ClassifiedAds)
    )
)
