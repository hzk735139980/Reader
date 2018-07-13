import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          value: this.props.bookname
        };
    
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidUpdate(prevProps){
        if( this.props.bookname !== prevProps.bookname ){
            this.setState({ value: this.props.bookname});
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    onChange(event){
        this.setState({value: event.target.value});
    }

    handleAddBookmark(){
        this.props.addbookmark(
            { bookurl: this.props.url, description: this.state.value }
        );
        this.toggle();
    }
    
    renderModal(){
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>添加书签</ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input type="textarea" name="text" id="exampleText" onChange={this.onChange} value={this.state.value} />
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> this.handleAddBookmark()}>Submit</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
    render(){
        return(
            <div className="fixed-top" style={{top:'15%'}}>
                <i className="far fa-bookmark" 
                 onClick={this.toggle} style={{ fontSize: '20px', cursor: 'pointer'}}></i>
                {this.renderModal()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { bookname: state.cont.bookname, url: state.cont.url };
}

export default connect(mapStateToProps, actions)(Bookmark);