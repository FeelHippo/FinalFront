import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getAllTags,
    getAd,
} from '../store/actions/index';

import PrintDetail from '../components/Detail/detail';

export class AdDetails extends Component {
    componentDidMount() {
        const {match: { params }} = this.props; 
        this.getDetails(params.detId);        
    }

    getDetails = detId => {
        this.props.getAd(detId);
    } 

    render() {
        return (
            <PrintDetail 
                {...this.props}
                _id={ this.props.match.params.detId }
            />
        )
    }
}

const mapStateToProps = state => {
    return state.ads
}

const mapDispatchToProps = {
    getAllTags,
    getAd,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdDetails)