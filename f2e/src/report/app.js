import React,{Component} from "react";
import echarts from 'echarts';
require('./report.css');

export default class App extends Component{

	constructor(){
		super();
		this.state={
			n:0,
			qidsIndex:0,
			list:[],
			qids:qids
		}
	}

	render(){
		return(
			<div>
				<div className="item"></div>
				{this.state.list.map((item,index)=>{
					return (<div className="item" key={index}>
								<div id={'main'+(index+1)} className="echars"></div>
							</div>)
				})}
			</div>
		)
	}

	componentDidMount(){
		var self=this;	
		var _qidsIndex=this.state.qidsIndex;	
		$(window).scroll(function(){  
        	if ($(document).height() - $(this).scrollTop() - $(this).height()<50) {
        		if(_qidsIndex<self.state.qids.length){
        			self.loadMore(self.state.qids[_qidsIndex]);  
        			_qidsIndex++;
        			self.setState({qidsIndex:_qidsIndex});
        		} 
        	}
    	}); 
	}

	loadMore(qid){	
		$.ajax({
			url:'/report/'+qid,
			success:(result)=>{
				const data=result.data;
				const names=[];
				for(let i=0;i<data.answers.length;i++){
					names.push(data.answers[i].name)
				}
				var list=[...this.state.list,0];
				this.setState({list:list,n:this.state.n+1});        
        		this.echartsInit(data.title,names,data.answers);
			}
		})		
		
	}

	echartsInit(title,names,answers){
        var myChart = echarts.init(document.getElementById('main'+this.state.n));
        var option = {
                title : {
                    text: title,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a}<br/> {b}:{c}({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: names
                },
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:answers,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        myChart.setOption(option);
	}
}
