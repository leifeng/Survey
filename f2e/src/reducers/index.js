import {combineReducers} from 'redux';
import {SET_QUESTION,SET_VALUE,SET_INDEX_INFO,INIT_SURVEY} from '../actions/index.js';

const initState={
	questions:[]
};
const answerState={};

const initData=(state=initState,action=null)=>{
	switch(action.type){
		case INIT_SURVEY:
			return action.data;
		default:
			return state;
	}
}

const answer=(state=answerState,action=null)=>{
	switch(action.type){
		case SET_VALUE:
		let key={};
			key['_'+action.id]=action.value
			return Object.assign({},state,key);
		default:
			return state;
	}
}

const surveyReducers = combineReducers({
    initData
});
module.exports = surveyReducers;