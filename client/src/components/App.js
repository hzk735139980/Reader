import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Signup from './auth/Signup';
import Profile from './Profile';
import Signin from './auth/Signin';
const Landing = () => <h1>landing</h1>;

class App extends Component {
    componentDidMount(){
        this.props.fetchuser();
    }

    render(){
        return(
            <BrowserRouter>
                <div className="container d-flex flex-column" style={{ height: '100vh'}}>
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/signin' component={Signin} />
                </div>
            </BrowserRouter>
        );
    }
};


export default connect(null, actions)(App);