import React from 'react';
import {findDOMNode} from 'react-dom';
import Tooltip  from "antd/lib/tooltip";
import Input  from "antd/lib/input";


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
export default class FillIn extends React.Component{

	constructor(props){
		super(props);
		this.onDelQ=this.onDelQ.bind(this);
		this.onTitleChange=this.onTitleChange.bind(this);
	}

	render(){
        const {isDragging,connectDragSource,connectDropTarget}=this.props;
		const {title,index}=this.props;
        return connectDragSource(connectDropTarget(
        	<div className="panel">
        		<div className="title">
        		{index+1}.问答题
        		<Tooltip placement="rightBottom" title="删除"><a className="del" onClick={this.onDelQ}><Icon type="cross-circle-o" /></a></Tooltip>
        		
        		</div>
	            <div className="question">
	                <Input id="defaultInput" placeholder="问题" onChange={this.onTitleChange} defaultValue={title}/>
	            </div>
            </div>
        ));
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
)(FillIn)