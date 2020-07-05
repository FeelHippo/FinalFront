import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getOneAd,
    changeAd,
} from '../store/actions/index';
import LocalStorage from '../services/Storage';

import PrintDetail from '../components/Detail/detail';

export class AdDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            authenticated: false,
            favorite: false,
        }
    }

    componentDidMount() {
        const {match: { params }} = this.props; 
        this.getDetails(params.detId); 
        // authentication check
        const storageToken = LocalStorage.readTokenStorage();
        const storeToken = this.props.session.token;
        let authenticated = (storageToken === storeToken) ? true : false;
        
        this.setState({ authenticated });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ads.favorite !== this.props.ads.favorite) {
          this.setFavorite();
        }
    }

    setFavorite = () => {
        // favorite status
        if (this.props.ads.favorite) {
            let isFavorite = this.props.ads.favorite.some(user => this.props.session.username === user);
            this.setState({ isFavorite })
        }
    }

    getDetails = detId => {
        this.props.getOneAd(detId);
    } 

    toggleFavorite = () => {
        // toggle from false to true, and add username, or else from true to false, and remove username
        if (!this.state.favorite) {
            this.props.changeAd({
                _id: this.props.ads._id,
                favorite: [...this.props.ads.favorite, this.props.session.username]
            })
        } else {
            const newFavUserList = this.props.ads.favorite.filter(user => user !== this.props.session.username)
            this.props.changeAd({
                _id: this.props.ads._id,
                favorite: newFavUserList,
            })
        }
        // update state
        this.setState({
            favorite: !this.state.favorite,
        })
        
    }

    render() {
        return (
            <PrintDetail 
                ad={ this.props.ads }
                _id={ this.props.match.params.detId }
                authenticated={ this.state.authenticated }
                markFavorite={ this.toggleFavorite }
                favorite={ this.state.favorite }
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        ads: state.ads,
        session: state.session,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        changeAd: ad => dispatch(changeAd(ad)),
        getOneAd: id => dispatch(getOneAd(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdDetails)