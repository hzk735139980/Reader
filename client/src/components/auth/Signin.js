import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component{
    submit = formProps => {
        this.props.signin(formProps, ()=>{
            this.props.history.push('/profile');
        });
    };

    renderError(){
        if(this.props.errorMsg){
            return(
                <div className="alert alert-danger">{this.props.errorMsg}</div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="container h-100">
                <div className="row h-100">
                    <form onSubmit={handleSubmit(this.submit)} className="col-sm-12 my-auto">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" className="form-control" component="input" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" className="form-control" component="input" type="password" />
                        </div>
                        {this.renderError()}
                        <button type="submit" className="btn btn-secondary">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
};

Signin = reduxForm({
  // a unique name for the form
  form: 'signin'
})(Signin)

function mapStateToProps(state){
    return { errorMsg: state.auth.errorMsg };
};

export default connect(mapStateToProps, actions)(Signin);