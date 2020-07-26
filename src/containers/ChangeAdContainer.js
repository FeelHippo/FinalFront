import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withSnackbar } from 'notistack';
import {
    getOneAd,
    changeAd,
    deleteItem,
    clearSnackbar,
} from '../store/actions/index.js';

import ChangeExistingAd from '../components/Change/changeAd';


export class ChangeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detId: '',
            deleted: false,
            redirect: false,
        }
    }
    
    componentDidMount() {
        const {match: { params }} = this.props;
        let detId = params.detId;
        // make id available to component
        this.setState({ detId });
        // fetch ad data from API
        this.getDetails(detId);
        // snackbar errors
        if(this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
    }

    getDetails = detId => {
        this.props.getOneAd(detId);
    }

    sendAd = async values => {
        var body = new FormData();
        Object.keys(values).forEach(key => {
            body.append(key, values[key])
        });
        body.append('_id', this.state.detId)

        let response = await this.props.changeAd(body);
        if (response) {
            this.setState({
                redirect: true,
            })
        }
    }

    deleteAd = async () => {
        await this.props.deleteItem(this.state.detId);
        this.setState({
            deleted: true,
        })
    }

    toggleFunction = async e => {
        await this.props.changeAd({
            _id: this.state.detId,
            [e.target.name]: !this.props.ads[e.target.name],
        });
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={`/detail/${this.state.detId}`} />
        } else if (this.state.deleted) {
            return <Redirect to={`/`} />
        }
        return (
            <ChangeExistingAd 
                ad={ this.props.ads }
                valid_tags={ this.props.valid_tags }
                handleSubmit={ this.sendAd }
                onDelete={ this.deleteAd }
                toggle={ this.toggleFunction }
                t={ this.props.t }
            />
        )
    }
}

const mapStateToProps = state => {    
    return {
        ads: state.ads,
        valid_tags: state.valid_tags,
        redirect: state.redirect,
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOneAd: detId => dispatch(getOneAd(detId)),
        changeAd: ad => dispatch(changeAd(ad)),
        deleteItem: detId => dispatch(deleteItem(detId)),
        clearSnackbar: () => dispatch(clearSnackbar()),
    }
}

export default withSnackbar(withTranslation()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ChangeDetail)
))