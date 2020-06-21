import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    getAd,
    getAllTags,
    changeAd,
    updateField,
} from '../store/actions/index.js';

import ChangeExistingAd from '../components/Change/changeAd';


export class ChangeDetail extends Component {
    
    componentDidMount() {
        const {match: { params }} = this.props; 
        
        this.getDetails(params.detId);

        this.getTags();
    }

    getDetails = async detId => {
        await this.props.getAd(detId);
    }

    getTags = () => {
        this.props.getAllTags();
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
        
        if (success.status === 200) {
            this.props.updateField({
                target: {
                    name: 'backhome',
                    value: true,
                }
            })    
        }
    }

    render() {
        if(this.props.backhome){
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
    return state.ads
}

const mapDispatchToProps = {
    getAd,
    getAllTags,
    changeAd,
    updateField,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeDetail);