import React,{Component} from "react";
import echarts from 'echarts';
require('./report.css');

export default class App extends Component{

	constructor(){
		super();
		this.state={
			n:0,
			qidsIndex:1,
			list:[],
			qids:qids,
			record:0,
			chart_type:'pie'
		}
	}

	render(){
		return(
			<div>
				{this.state.qids.map((item,index)=>{
					return (<div className="item" key={index}>
								<div>
								<h5 id={'title'+(index+1)}></h5>
								<div id={'main'+(index+1)} className="echars"></div>
								</div>
							</div>)
				})}
			</div>
		)
	}

	componentDidMount(){
		var self=this;
		var _qidsIndex=this.state.qidsIndex;
    this.loadMore(this.state.qids[0].id);
		$(window).scroll(function(){
        	if ($(document).height() - $(this).scrollTop() - $(this).height()<50) {
        		if(_qidsIndex<self.state.qids.length){
        			self.loadMore(self.state.qids[_qidsIndex].id);
        			_qidsIndex++;
        			self.setState({qidsIndex:_qidsIndex});
        		}
        	}
    	});
	}

	loadMore(qid){
		var rfrom = requestFrom || "web";
		var url = "";
		if(rfrom == 'admin'){
			url = '/admin/survey/chartinfo/qid/';
		}else if(rfrom == 'web') {
			url = '/user/chartinfo/qid/';
		}
		$.ajax({
			url:url+qid,
			success:(result)=>{
				const data=result.data;
				const names=[];
				if (typeof(data)=='undefined') {
					return;
				}
				for(let i=0;i<data.answers.length;i++){
					names.push(data.answers[i].name)
				}
				var list=[...this.state.list,0];
				this.setState({list:list,n:this.state.n+1});
          if(data.answers.length>0){
        		this.echartsInit(data.title,names,data.answers,data.record);
          }
			}
		})
	}

	echartsInit(title,names,answers,record,chart_type){
				var outDom = document.getElementById('main'+this.state.n);
				var titleDom = document.getElementById('title'+this.state.n);
				$(titleDom).text(title);
				if (record==0) {
					$(outDom).text('无统计数据');
					return;
				}
				if (chart_type=='pie') {
					if (answers.length > 0) {
						pieChart(outDom);
					}else{
						$(outDom).text('无统计数据');
					}
				}
	}

	pieChart(dom){
		var myChart = echarts.init(outDom);
		var option = {
						title : {
								text: '',
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
						toolbox: {
							show: true,
							feature: {
									saveAsImage: {show: true}
							}
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
