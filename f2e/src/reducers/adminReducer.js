import {
	combineReducers
}
from 'redux';
import {
	ADD_QUESTION, EDIT_QUESTION, DEL_QUESTION, EDIT_ORDER, EDIT_TITLE, UPDATE_ORDERS, UPDATE_QUESTION,SET_SID,UPDATE_LOAD,UPDATE_OPTIONS
}
from '../actions/adminActions.js';
import update from 'react/lib/update';

// {
// 	sid: 123, //问卷id,
// 	title:'',
// 	options:{
// 		startTime:'',
// 		endTime:'',
// 		ip:true,
// 		repeat:true,
// 		isLogin:true
// 	}
// 	questions: [{
// 		type: 1, //题型
// 		title: '这是单选问题', //问题
// 		options: ['选项1', '选项2', '选项3'], //选项
// 		index: 1 //排序
// 	}, {
// 		type: 2,
// 		title: '这是多选问题',
// 		options: ['选项1', '选项2', '选项3'],
// 		index: 2
// 	}, {
// 		type: 3,
// 		title: '这是填空题',
// 		index: 3
// 	}, {
// 		type: 4,
// 		title: '排序题',
// 		options: ['第一', '第二', '第三'],
// 		index: 4
// 	}]
// }

const initState={
	sid:1,
	title:'',
	options:{},
	questions:[]
};

const view={
	loading:false
};

const questions = (state = initState.questions, action = null) => {
	switch (action.type) {
		case ADD_QUESTION:
			return [...state, action.option];
		case EDIT_QUESTION:
			const op = action.option;
			return state.map(item => item.unique === action.id ? Object.assign({}, item, op) : item);
		case DEL_QUESTION:
			return state.filter(item => {
				return item.unique !== action.id
			});
		case UPDATE_QUESTION:
			return update(state, {
				$splice: [
					[action.dragIndex, 1],
					[action.hoverIndex, 0, action.dragQ]
				]
			});
		default:
			return state;
	}
}

const title = (state = initState.title, action = null) => {
	switch (action.type) {
		case EDIT_TITLE:
			return action.title;
		default:
			return state;
	}
}

const options=(state=initState.options,action=null)=>{
	switch(action.type){
		case UPDATE_OPTIONS:
			const op={};
			op[action.name]=action.value;
			return Object.assign({},state,op);
		default:
			return state;
	}
}

const sid=(state=initState.sid,action=null)=>{
	switch(action.type){
		case SET_SID:
			return action.sid;
		default:
			return state;
	}
	
}

const loading=(state=view.loading,action)=>{
	switch(action.type){
		case 'UPDATE_LOAD':
			return action.load;
		default:
			return state;
	}
}

const surveyReducers = combineReducers({
	questions,
	title,
	sid,
	options,
	loading
});

module.exports = surveyReducers;