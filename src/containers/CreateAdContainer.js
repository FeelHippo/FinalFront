import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { 
    createAd,
} from '../store/actions/index';

import CreateNewAd from '../components/Create/createAd';

class CreateAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    sendAd = async values => {
        values.photo = values.photo ? values.photo : '';

        let body = {
            creator: this.props.session.username || '',
            name: values.name || '',
            price: values.price || 0,
            description: values.description || '',
            photo: values.photo || '',
            tags: [values.tag1, values.tag2] || ['', ''],
            type: values.type || true,
        }
        
        const success = await this.props.createAd(body);
        if (success) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={`/`} />
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

const mapDispatchToProps = dispatch => {
    return {
        createAd: body => dispatch(createAd(body)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAd);