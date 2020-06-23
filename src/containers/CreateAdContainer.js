import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAd } from '../store/actions/index';

import CreateNewAd from '../components/Create/createAd';

class CreateAd extends Component {

    sendAd = async values => {
        values.photo = values.photo ? values.photo : '';
        
        const success = await this.props.createAd({
            name: values.name,
            price: values.price,
            description: values.description,
            photo: values.photo,
            tags: [values.tag1, values.tag2],
            type: values.type
        });
        
        // if (success.payload._id) {
        //     this.props.updateField({
        //         target: {
        //             name: 'backhome',
        //             value: true,
        //         }
        //     })
        // }
        
    }

    render() {
        if(this.props.backhome){
            return <Redirect to='/ads'/>
        }
        
        return (
            <CreateNewAd 
                valid_tags={ this.props.valid_tags }
                onSubmit={ this.sendAd }
            />
        )
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    createAd,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAd);