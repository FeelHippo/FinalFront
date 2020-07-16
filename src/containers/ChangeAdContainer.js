import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
    getOneAd,
    changeAd,
    deleteItem,
} from '../store/actions/index.js';

import ChangeExistingAd from '../components/Change/changeAd';


export class ChangeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detId: '',
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

        const success = await this.props.changeAd(body);
        if (success) {
            this.setState({
                redirect: true
            })
        }
    }

    deleteAd = async () => {

        const success = await this.props.deleteItem(this.state.detId)

        if (success) {
            this.setState({
                redirect: true
            })
        }
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOneAd: detId => dispatch(getOneAd(detId)),
        changeAd: ad => dispatch(changeAd(ad)),
        deleteItem: detId => dispatch(deleteItem(detId)),
    }
}

export default withTranslation()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ChangeDetail)
)