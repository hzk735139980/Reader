import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component{
    constructor(props) {
        super(props);
    
        this.toContent = this.toContent.bind(this);
        this.delete = this.delete.bind(this);        
    }

    componentDidMount(){
        this.shouldNavigateAway();
        this.props.fetchbookmark();
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
    }

    shouldNavigateAway(){
        if(!this.props.authenticated){
            this.props.history.push('/');
        }
    }

    toContent(url) {
        this.props.fetchcontent({URL: url}, ()=>{
            this.props.history.push('/content');
        });
    }

    delete(id){
        this.props.deletebookmark(id, ()=>{
            this.props.fetchbookmark();
            this.forceUpdate();
        });
    }

    renderBookmark(){
        return this.props.mark.map( bookmark => {
            return  <tr key={bookmark._id}>
                        <td>{bookmark.saveDate}</td>
                        <td style={{cursor: 'pointer'}} onClick={()=>this.toContent(bookmark.bookurl)}>{bookmark.description}example</td>
                        <td style={{cursor: 'pointer'}} onClick={()=>this.delete(bookmark._id)}>Delete?</td>
                    </tr>
        })
    }

    render(){
        return(
            <div className="container pt-5">
                <h4>Bookmark}</h4>
                <table className="table table-borderless">
                    <tbody>
                        {this.renderBookmark()}
                    </tbody>
                </table>
            </div>
        )
    }
};


function mapStateToProps(state){
    return { authenticated: state.auth.authenticated,
             mark: state.mark };
}

export default connect(mapStateToProps, actions)(Profile);