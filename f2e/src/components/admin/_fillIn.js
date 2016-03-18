import React,{Component} from 'react';
import {Input,Icon,Tooltip} from 'antd';

export default class FillIn extends Component{
	constructor(props){
		super(props);
		this.onDelQ=this.onDelQ.bind(this);
		this.onTitleChange=this.onTitleChange.bind(this);
	}

	render(){
		const {title,options,order,o}=this.props;
        return (
        	<div className="panel" data-order={order} data-index={o}>
        		<div className="title">
        		填空题
        		<Tooltip placement="rightBottom" title="删除"><a className="del" onClick={this.onDelQ}><Icon type="minus-circle-o" /></a></Tooltip>
        		
        		</div>
	            <div className="question">
	                <Input id="defaultInput" placeholder="标题" onChange={this.onTitleChange} value={title}/>
	            </div>
            </div>
        )
	}

	onDelQ(){
    	const {order,del}=this.props;
    	del(order);
    }

    onTitleChange(e){
    	const {edit,order}=this.props;
    	edit(order,{
    		title:e.target.value
    	}); 
    }
}