import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
  
class Header extends Component {


    renderLink(){
        if(this.props.authenticated){
            return (
                <nav className="nav nav-masthead bd-highlight">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-link">My Profile</NavLink>
                    <NavLink to="/" className="nav-link"
                        onClick={() => {
                            this.props.signout();
                          }}
                    >Sign Out</NavLink>
                </nav>
            )
        }else{
            return (
                <nav className="nav nav-masthead bd-highlight">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                    <NavLink to="/signin" className="nav-link">Login</NavLink>
                </nav>
            )
        }
    }

    render(){
        return(
            <header className="p-3 d-flex bd-highlight">
                <h3 className="masthead-brand mr-auto">Reader</h3>
                {this.renderLink()}
            </header>
        );
    }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);