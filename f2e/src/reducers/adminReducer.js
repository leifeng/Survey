import {combineReducers} from 'redux';
import {ADD_QUESTION,EDIT_QUESTION,DEL_QUESTION,EDIT_ORDER,EDIT_TITLE,UPDATE_ORDERS} from '../actions/adminActions.js';


/*
 [{
	type: 1,
	title: '这是单选问题',
	options: ['选项1', '选项2', '选项3'],
	order: 1
}, {
	type: 2,
	title: '这是多选问题',
	options: ['选项1', '选项2', '选项3'],
	order: 2
}, {
	type: 3,
	title: '这是填空题',
	order: 3
}, {
	type: 4,
	title: '排序题',
	options: ['第一', '第二', '第三'],
	order: 4
}]
*/
//[1,2,3,4]
const titleState='';
const questionsState=[]
const ordersState=[];

const questions=(state=questionsState,action=null)=>{
	switch(action.type){
		case ADD_QUESTION:
			return [...state,action.option];
		case EDIT_QUESTION:
			const op=action.option;			
			return state.map(item=>item.order===action.order?Object.assign({},item,op):item);
		case EDIT_ORDER:
			console.log('传入',orders);
			return state.map((item)=>{				
				//console.log(item.order,action.orders.indexOf(item.order))
				return Object.assign({},item,{order:action.orders.indexOf(item.order)})
			}).sort((a,b)=>a.order>b.order);
		case DEL_QUESTION:
			return state.filter(item=>item.order!==action.order);
		default:
			return state;

	}
}

const title=(state=titleState,action=null)=>{
	switch(action.type){
		case EDIT_TITLE:
			return action.title;
		default:
			return state;
	}
}
const orders=(state=ordersState,action=null)=>{
	switch(action.type){
		case UPDATE_ORDERS:
			return action.orders;
		default:
			return state;
	}
}

const surveyReducers = combineReducers({
	questions,
	title,
	orders
});

module.exports = surveyReducers;