import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import {
    getDefaultAds,
    searchAds,
    searchUser,
    clearSnackbar,
} from '../store/actions/index.js';

import Home from '../components/Home/ads';

export class ClassifiedAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSearched: '',
            redirect: false,
            order: "new",
        }
    }

    componentDidMount() {
        this.props.getDefaultAds();
        // snackbar errors
        if(this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
    }

    searchUser = async values => {
        let response = await this.props.searchUser(values.name);
        if(!response._id) {
            this.key = this.props.enqueueSnackbar(response.msg);
            this.props.clearSnackbar();
        } else {
            this.setState({
                userSearched: response.username,
                redirect: true,
            })
        }
    }

    searchAds = async values => {
        let response = await this.props.searchAds(values);
        if (response.msg) {
            this.key = this.props.enqueueSnackbar(response.msg);
            this.props.clearSnackbar();
        }
    }

    changeOrder = evt => {
        evt.preventDefault();
        this.setState({
            order: evt.target.value
        })
    }

    render() {
        if(this.state.redirect){
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
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        searchAds: params => dispatch(searchAds(params)),
        searchUser: user => dispatch(searchUser(user)),
        getDefaultAds: () => dispatch(getDefaultAds()),
        clearSnackbar: () => dispatch(clearSnackbar()),
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
