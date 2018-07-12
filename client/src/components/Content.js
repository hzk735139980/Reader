import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import * as actions from '../actions';

const color = [ {黄橙: "#fef0e1"}, { 洋红: "#feeaee"}, { 淡粉: "#fdecfd"}, {水蓝: "#e9f4fc"}, { 草绿: "#f3fdec"}];
const font = [ {小: "14px"}, {中: "16px"}, {大: "20px"}, {特大: "24px"}];

class Content extends Component {
    constructor(props) {
        super(props);
    
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.updateSettingHander = this.updateSettingHander.bind(this);
    }

    componentDidMount(){
        this.shouldNavigateAway();
        document.body.style.backgroundColor = this.props.bgcolor;
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
    
    updateSettingHander(bgcolor, fontsize){
        // console.log({bgcolor, fontsize});
        this.props.updatesetting({bgcolor, fontsize}, ()=>{
            document.body.style.backgroundColor = bgcolor;
            this.props.fetchuser();
            this.forceUpdate();
        });
    }

    renderColorMenu(){
        return color.map((colorName, i)=>{
            return <MenuItem eventKey={i} key={i} onClick={()=>this.updateSettingHander(Object.values(colorName), this.props.fontsize)}>{Object.keys(colorName)}</MenuItem>
        })
    }

    renderFontMenu(){
        return font.map((fontName, i)=>{
            return <MenuItem eventKey={i} key={i} onClick={()=>this.updateSettingHander(this.props.bgcolor, Object.values(fontName))}>{Object.keys(fontName)}</MenuItem>
        })
    }
    render(){
        return(
            <div className="container p-5">
                <h3 className="text-center font-weight-bold">{this.props.bookname}</h3>
                <div className="d-flex justify-content-around alert alert-dark">
                    <DropdownButton
                        title= '背景颜色'
                        noCaret
                        id='dropdown-size-small'
                        className="alert-dark border-0"
                        >
                        {this.renderColorMenu()}
                    </DropdownButton>
                    <DropdownButton
                        title= '字体大小'
                        noCaret
                        id='dropdown-size-small'
                        className="alert-dark border-0"
                        >
                        {this.renderFontMenu()}
                    </DropdownButton>
                </div>
                <div style={{fontSize: this.props.fontsize}} dangerouslySetInnerHTML={{ __html: this.props.content }} />
                {this.renderLink()}
            </div>
        )
    }
};

function mapStateToProps(state){
    return { bookname: state.cont.bookname, content: state.cont.content,
             prev: state.cont.prev, next: state.cont.next,
             fontsize: state.auth.fontsize, bgcolor: state.auth.bgcolor };
}

export default connect(mapStateToProps, actions)(Content);