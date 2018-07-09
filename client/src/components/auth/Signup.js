import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component{
    submit = formProps => {
        this.props.signup(formProps, ()=>{
            this.props.history.push('/profile');
        });
    };

    renderError(){
        if(this.props.errorMsg){
            return(
                <div className="alert alert-warning">{this.props.errorMsg}</div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;
        return(
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
                    <div className="form-group">
                        <label htmlFor="repassword">Confirm Password</label>
                        <Field name="repassword" className="form-control" component="input" type="password" />
                    </div>
                    {this.renderError()}
                    <button type="submit" className="btn btn-secondary">Sign up</button>
                </form>
            </div>
        );
    }
};

Signup = reduxForm({
  // a unique name for the form
  form: 'signup'
})(Signup)

function mapStateToProps(state){
    return { errorMsg: state.auth.errorMsg };
};

export default connect(mapStateToProps, actions)(Signup);