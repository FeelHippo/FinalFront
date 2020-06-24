import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getOneAd,
} from '../store/actions/index';

import PrintDetail from '../components/Detail/detail';

export class AdDetails extends Component {
    componentDidMount() {
        const {match: { params }} = this.props; 
        this.getDetails(params.detId);    
    }

    getDetails = detId => {
        this.props.getOneAd(detId);
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
    return state.user_search
}

const mapDispatchToProps = {
    getOneAd,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdDetails)