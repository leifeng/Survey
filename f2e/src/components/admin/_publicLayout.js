import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Input,Button,Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
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
export default class PublicLayout extends Component{
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
		const {title,answers,txt,type,index}=this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
        	<div className="panel" style={{opacity}}>
        		<div className="title">
        		{index+1}.{txt}
        	   <a className="del" onClick={this.onDelQ}><Icon type="cross-circle-o" /></a>        		
        		</div>
	            <div className="question">
	                <Input id="defaultInput" placeholder="标题" onChange={this.onTitleChange} value={title}/>
	                <ul className="list"  onClick={this.onDelOpt}>
	                	 {answers.map((item,index)=>{
	                		return <li key={index}><Icon type="minus-circle-o" data-index={index}/><input type="text" value={item} data-index={index} onChange={this.onOptChange}/></li>
	                	})}
	                </ul>	               
	                <Button type="primary" onClick={this.onAdd} size="small"><Icon type="plus-circle-o" />添加</Button>
	            </div>
            </div>
        ))
    }

    onDelOpt(e){
    	const {editQuestion,unique,answers,id}=this.props;
    	const target=e.target;
    	if(target.nodeName==='I'){
    		const idx=target.getAttribute('data-index')-0;
    		editQuestion(id+unique,{
    			answers:answers.filter((item,index)=>index!==idx)
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
        const {editQuestion,answers,unique,id}=this.props;
    	if(target.nodeName==='INPUT'){
    		let idx=target.getAttribute('data-index');
    		let value=target.value;
    		editQuestion(id+unique,{
    			answers:answers.map((item,index)=>index==idx?value:item)
    		}); 
    	}        
    }

    onAdd(){
        const {editQuestion,unique,answers,id}=this.props;
        editQuestion(id+unique,{
    	   answers:[...answers,'']
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