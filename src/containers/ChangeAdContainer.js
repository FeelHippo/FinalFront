import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    getOneAd,
    changeAd,
    redirectAfterLoading,
} from '../store/actions/index.js';

import ChangeExistingAd from '../components/Change/changeAd';


export class ChangeDetail extends Component {
    
    componentDidMount() {
        const {match: { params }} = this.props; 
        
        this.getDetails(params.detId);
    }

    getDetails = async detId => {
        await this.props.getOneAd(detId);
    }

    submitAd = async values => {
        
        const {match: { params }} = this.props;

        const success = await this.props.changeAd({
            _id: params.detId,
            name: values.name,
            price: values.price,
            description: values.description,
            photo: values.photo,
            tags: [values.tag1, values.tag2],
            type: values.type
        });
        
        if (success.payload._id) {
            this.props.redirectAfterLoading(true)
        }
    }

    render() {
        if(this.props.redirect){
            return <Redirect to={`/detail/${this.props._id}`}/>
        }
        
        return (
            <ChangeExistingAd 
                {...this.props}
                valid_tags={ this.props.valid_tags }
                onSubmit={ this.submitAd }
            />
        )
    }
}

const mapStateToProps = state => {    
    return state.user_search
}

const mapDispatchToProps = {
    getOneAd,
    changeAd,
    redirectAfterLoading
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeDetail);