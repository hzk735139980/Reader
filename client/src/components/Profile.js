import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: ''
          };
      
        this.toggle = this.toggle.bind(this);
        this.toContent = this.toContent.bind(this);
        this.delete = this.delete.bind(this);        
    }

    componentDidMount(){
        // console.log(this.props);
        this.shouldNavigateAway();
        this.props.fetchbookmark();
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    
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
                        <td style={{cursor: 'pointer'}} onClick={()=>this.toContent(bookmark.bookurl)}>{bookmark.description}</td>
                        <td style={{cursor: 'pointer'}} onClick={()=>{this.toggle(); this.setState({id: bookmark._id})}}>Delete?</td>
                    </tr>
        })
    }

    renderModal(){
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>删除书签</ModalHeader>
                <ModalBody>
                    Are you sure want to delete this bookmark?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{this.delete(this.state.id); this.toggle();}}>Delete</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render(){
        return(
            <div className="container pt-5">
                {this.renderModal()}
                <h4>Bookmark</h4>
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
             mark: state.mark.reverse() };
}

export default connect(mapStateToProps, actions)(Profile);