import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        let detId = params.detId
        
        this.setState({ detId });

        this.getDetails(detId);
    }

    getDetails = detId => {
        this.props.getOneAd(detId);
    }

    submitAd = async values => {

        const success = await this.props.changeAd({
            _id: this.state.detId,
            name: values.name,
            price: values.price,
            description: values.description,
            photo: values.photo,
            tags: [values.tag1, values.tag2],
            type: values.type
        });
        
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
            return <Redirect to={`/settings`} />
        }
        return (
            <ChangeExistingAd 
                ad={ this.props.ads }
                valid_tags={ this.props.valid_tags }
                onSubmit={ this.submitAd }
                onDelete={ this.deleteAd }
                toggle={ this.toggleFunction }
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeDetail);