import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component{
    componentDidMount(){
        this.shouldNavigateAway();
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
    }

    shouldNavigateAway(){
        if(!this.props.authenticated){
            this.props.history.push('/');
        }
    }

    render(){
        return(
            <div>Profile</div>
        );
    }
};


function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Profile);