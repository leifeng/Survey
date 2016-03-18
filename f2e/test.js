import React from 'react';
import {render} from 'react-dom';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			arrs:[]
		}
		this.onClick=this.onClick.bind(this);
	}

	render(){
		return(
			<div>
				{this.state.arrs.map((item,index)=>{
					return <h5 key={index}>{item.name}</h5>
				})}
				<div>
					<a onClick={this.onClick}>add</a>
				</div>
			</div>
			)
	}

	onClick(){
		const arr=this.state.arrs;
		this.setState({
			arrs:[...arr,{
					name:Math.random()*10000
			}]
		})
	}
}

render(<App/>,document.getElementById('root'))