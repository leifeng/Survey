import React from 'react';
import {render} from 'react-dom';
import dragula from 'react-dragula';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			arrs:[{name:'第零',order:0},{name:'第一',order:1},{name:'第二',order:2},{name:'第三',order:3}]
		}
		this.onClick=this.onClick.bind(this);
	}

	render(){
		const {arrs}=this.state;
		//const arr=Object.assign([],arrs).sort((a,b)=>{console.log(a.order,b.order);return a.order-b.order>0});
		
		return(
			<div>
			<h5>移动切换顺序后删除</h5>
			<ul onClick={this.onClick} ref='targetQ'>
				{arrs.map((item,index)=>{
					return <li key={index} data-order={item.order}>inde:{index}  order:{item.order}  {item.name}  <a data-order={item.order}>del</a></li>
				})}
			</ul>	
			</div>
			)
	}

	componentDidMount(){
		const {targetQ}=this.refs;
		const drake = dragula([targetQ]);
		drake.on('drag',(el,source)=>{
			console.log('drag')
		})
		drake.on('dragend',el=>{
				console.log('dragend')
		})
		drake.on('drop',(el,target,source,sibling)=>{
			console.log('drop')
			//drake.remove()
         //    const lis=targetQ.getElementsByTagName('li');
       	 // 	const arr=[];
        	// for(let i=0;i<lis.length;i++){
         //  		  arr.push(lis[i].getAttribute('data-order')-0);
       		// }     
       		// console.log('new',arr);
       		// 	this.setState({
       		// 		arrs:this.state.arrs.map((item,index)=>{
       		// 			return Object.assign({},item,{order:arr.indexOf(item.order)})
       		// 		}).sort((a,b)=>{console.log(a.order,b.order);return a.order-b.order>0})     			
       		// })
       		// setTimeout(()=>{       			

       		// 	console.log('state',this.state.arrs);
       		// },100)

        });
        drake.on('remove',(el,container,source)=>{
        	console.log('remove');
        })

	}

	onClick(e){
		const target=e.target;
		if(target.nodeName==='A'){
			// const order=target.getAttribute('data-order');
			// const ar=this.state.arrs.filter(item=>item.order!=order);
			// console.log(order,ar)
			// this.setState({arrs:ar})
		}
	}
}

render(<App/>,document.getElementById('root'))