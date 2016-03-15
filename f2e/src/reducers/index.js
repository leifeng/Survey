import {combineReducers} from 'redux';
import {SET_QUESTION,SET_VALUE,SET_INDEX_INFO} from '../actions/index.js';
const indexState = {};
const answerState={};
const questionState = [];

const question = (state = questionState, action = null)=> {
    switch (action.type) {
        case SET_QUESTION:
            return action.question;
        default:
            return state;
    }
};

const indexInfo=(state=indexState,action=null)=>{
	switch(action.type){
		case SET_INDEX_INFO:
			let key={};
			key['i'+action.id]=action.value
			return Object.assign({},state,key);
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
	answer,
    question
});
module.exports = surveyReducers;