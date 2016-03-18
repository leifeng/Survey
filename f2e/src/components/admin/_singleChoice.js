import React,{Component} from 'react';
import {Input,Button,Icon,Tooltip} from 'antd';


export default class SingleChoice extends Component{
	constructor(props){
		super(props);
		this.onOptChange=this.onOptChange.bind(this);
		this.onTitleChange=this.onTitleChange.bind(this);
		this.onAdd=this.onAdd.bind(this);
		this.onDelQ=this.onDelQ.bind(this);
		this.onDelOpt=this.onDelOpt.bind(this);
	}


	render() {
		const {title,options,order}=this.props;
        return (
        	<div className="panel" data-order={order}>
        		<div className="title">
        		单选题
        		<Tooltip placement="rightBottom" title="删除"><a className="del" onClick={this.onDelQ}><Icon type="minus-circle-o" /></a></Tooltip>
        		
        		</div>
	            <div className="question">
	                <Input id="defaultInput" placeholder="标题" onChange={this.onTitleChange} value={title}/>
	                <ul onChange={this.onOptChange} className="list"  onClick={this.onDelOpt}>
	                	 {options.map((item,index)=>{
	                		return <li key={index}><Icon type="minus-circle-o" data-index={index}/><input type="text" value={item} data-index={index}/></li>
	                	})}
	                </ul>	               
	                <Button type="primary" onClick={this.onAdd}>添加</Button>
	            </div>
            </div>
        )
    }

    onDelOpt(e){
    	const {edit,order,options}=this.props;
    	const target=e.target;
    	if(target.nodeName==='I'){
    		const idx=target.getAttribute('data-index')-0;
    		edit(order,{
    			options:options.filter((item,index)=>index!==idx)
    		})
    	}
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

    onOptChange(e){
    	const target=e.target;
    	if(target.nodeName==='INPUT'){
    		let {edit,options,order}=this.props;
    		let idx=target.getAttribute('data-index');
    		let value=target.value;
    		edit(order,{
    			options:options.map((item,index)=>index==idx?value:item)
    		}); 
    	}        
    }

    onAdd(){
        const {edit,order,options}=this.props;
        edit(order,{
    		options:[...options,'']
    	}); 
    }

}