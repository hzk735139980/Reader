import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
  
class Header extends Component {


    renderLink(){
        if(this.props.authenticated){
            return (
                <nav className="nav nav-masthead bd-highlight">
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            <i className="fas fa-user" style={{ fontSize: '20px' }}></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem disabled><NavLink to="/profile" className="nav-link">My Profile</NavLink></DropdownItem>
                            <DropdownItem disabled>
                            <NavLink to="/" className="nav-link"
                                    onClick={() => {
                                        this.props.signout();
                                    }}
                                >Sign Out</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        
                    </UncontrolledDropdown>
                </nav>
            )
        }else{
            return (
                <nav className="nav nav-masthead bd-highlight">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                    <NavLink to="/signin" className="nav-link">Login</NavLink>
                </nav>
            )
        }
    }

    render(){
        return(
            <header className="p-3 d-flex bd-highlight bg-light shadow-sm">
                <NavLink to="/" className="masthead-brand mr-auto" style={{textDecoration: "none", color: "black"}}><h3 >Reader</h3></NavLink>
                {this.renderLink()}
            </header>
        );
    }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);