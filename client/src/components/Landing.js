import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleClick() {
        this.props.fetchcontent({URL: this.state.value}, ()=>{
            this.props.history.push('/content');
        });
    }

    renderError(){
        if(this.props.error){
            return <div className="alert alert-light text-danger">{this.props.error}</div>
        }
    }

    render(){
        return(
            <div className="container h-100">
                <div className="h-100 row">
                    <div className="col-sm-12 my-auto">
                        <h3>Welcome!</h3>
                        <h5>Try to paste "https://www.sto.cc/book-173227-1.html" for an example.</h5>
                        <div className="input-group">
                            <input type="text" style={{ height: '48px'}} onChange={this.handleChange} value={this.state.value} className="form-control" placeholder="URL of the book that you are reading, no &quot;&quot; include" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleClick}>
                                    <i className="fas fa-arrow-right" style={{fontSize: '32px'}}></i>
                                </button>
                            </div>
                        </div>
                        {this.renderError()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { error: state.cont.error };
}

export default connect(mapStateToProps, actions)(Landing);