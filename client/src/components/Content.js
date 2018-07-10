import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Content extends Component {
    constructor(props) {
        super(props);
    
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentDidMount(){
        this.shouldNavigateAway();
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
        window.scrollTo(0, 0);
    }

    shouldNavigateAway(){
        if(!this.props.content){
            this.props.history.push('/');
        }
    }

    forceUpdateHandler(url){
        this.props.fetchcontent({URL: url}, () =>{
            this.forceUpdate();
        });
    }

    renderLink(){
        if(this.props.prev === 'undefined'){
            return  <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-secondary" onClick={() => this.forceUpdateHandler(this.props.next)}>下一章</button>
                    </div>
        }
        else if(this.props.next === 'undefined'){
            return  <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-secondary" onClick={() => this.forceUpdateHandler(this.props.prev)}>上一章</button>
                    </div>
        }else{
            return  <div className="d-flex justify-content-around p-4">
                        <button className="btn btn-secondary" onClick={() => this.forceUpdateHandler(this.props.prev)}>上一章</button>
                        <button className="btn btn-secondary" onClick={() => this.forceUpdateHandler(this.props.next)}>下一章</button>
                    </div>
        }

    }

    render(){
        return(
            <div className="container p-5">
                <h3 className="text-center font-weight-bold">{this.props.bookname}</h3>
                <div style={{fontSize:'16px'}} dangerouslySetInnerHTML={{ __html: this.props.content }} />
                {this.renderLink()}
            </div>
        )
    }
};

function mapStateToProps(state){
    return { bookname: state.cont.bookname, content: state.cont.content,
             prev: state.cont.prev, next: state.cont.next };
}

export default connect(mapStateToProps, actions)(Content);