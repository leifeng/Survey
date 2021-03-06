import React from 'react';
import {findDOMNode} from 'react-dom';

// import Button  from "antd/lib/button";
// import Input  from "antd/lib/input";
// import Icon  from "antd/lib/icon";

import { Form, Input, Checkbox,Icon,Button } from 'antd';
const FormItem = Form.Item;

import connect from 'react-redux/lib/components/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import  DropTarget  from 'react-dnd/lib/DropTarget';
import  DragSource from 'react-dnd/lib/DragSource';
import * as actions from '../../actions/adminActions';
const source={
    beginDrag(props){
        return {
            unique:props.unique,
            index:props.index
        }
    }
}
const target={
    hover(props,monitor,component){
        const dragIndex=monitor.getItem().index;
        const hoverIndex=props.index;
        if(dragIndex===hoverIndex) return;
        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        props.onMove(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
}

@DropTarget('publicLayout', target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('publicLayout', source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class PublicLayout extends React.Component{
	constructor(props){
		super(props);
		this.onOptChange=this.onOptChange.bind(this);
		this.onTitleChange=this.onTitleChange.bind(this);
		this.onAdd=this.onAdd.bind(this);
		this.onDelQ=this.onDelQ.bind(this);
		this.onDelOpt=this.onDelOpt.bind(this);
	}


	render() {
        const {isDragging,connectDragSource,connectDropTarget}=this.props;
		const {title,options,txt,type,index}=this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
        	<div className="panel" style={{opacity}}>
        		<div className="title">
        		{index+1}.{txt}
        	   <a className="del" onClick={this.onDelQ}><Icon type="cross-circle-o" /></a>
        		</div>
	            <div className="question">
              <Input id="defaultInput" placeholder="问卷标题" onChange={this.onTitleChange} value={title}/>
	                <ul className="list"  onClick={this.onDelOpt}>
	                	 {options.map((item,index)=>{
	                		return <li key={index}><Icon type="minus-circle-o" data-index={index}/><input type="text" value={item} data-index={index} onChange={this.onOptChange}/></li>
	                	})}
	                </ul>
	                <Button type="primary" onClick={this.onAdd} size="small"><Icon type="plus-circle-o" />添加</Button>
	            </div>
            </div>
        ))
    }

    onDelOpt(e){
    	const {editQuestion,unique,options,id}=this.props;
    	const target=e.target;
    	if(target.nodeName==='I'){
    		const idx=target.getAttribute('data-index')-0;
    		editQuestion(id+unique,{
    			options:options.filter((item,index)=>index!==idx)
    		})
    	}
    }

    onDelQ(){
    	const {unique,delQuestion,id,delId}=this.props;
        if(id) delId(id);
    	delQuestion(id+unique);
    }

    onTitleChange(e){
    	const {editQuestion,unique,id}=this.props;
    	editQuestion(id+unique,{
    		title:e.target.value
    	});
    }

    onOptChange(e){
    	const target=e.target;
        const {editQuestion,options,unique,id}=this.props;
    	if(target.nodeName==='INPUT'){
    		let idx=target.getAttribute('data-index');
    		let value=target.value;
    		editQuestion(id+unique,{
    			options:options.map((item,index)=>index==idx?value:item)
    		});
    	}
    }

    onAdd(){
        const {editQuestion,unique,options,id}=this.props;
        editQuestion(id+unique,{
    	   options:[...options,'']
    	});
    }

}

function mapStateToProps(state) {
    return {
        questions: state.initData.questions
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicLayout)
