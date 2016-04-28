import {combineReducers} from 'redux';
import {SET_QUESTION,SET_VALUE,SET_INDEX_INFO,INIT_SURVEY,SET_ID,UPDATE_MSG} from '../actions/index.js';

const initState={
	questions:[],
	author:'',
	num:0

};
const answerState={
	id:'',
	data:[]
};
const postResultState={
	err:'success',
	msg:'',
	hidden:1
}
const initData=(state=initState,action=null)=>{
	switch(action.type){
		case INIT_SURVEY:
			return Object.assign({},action.data);
		default:
			return state;
	}
}

const answers=(state=answerState,action=null)=>{
	switch(action.type){
		case SET_VALUE:
		let key={};
			key[action.id]=action.value
			return Object.assign({},state,{data:Object.assign({},state.data,key)});
		case SET_ID:
			return Object.assign({},state,{id:action.id});
		default:
			return state;
	}
}

const postResult=(state=postResultState,action=null)=>{
	switch(action.type){
		case UPDATE_MSG:
			return Object.assign({},action.data)
		default:
			return state;
	}
}

const surveyReducers = combineReducers({
    initData,
    answers,
    postResult
});
module.exports = surveyReducers;