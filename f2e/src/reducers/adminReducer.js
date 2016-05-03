import {
	combineReducers
}
from 'redux';
import {
	INIT_QUESTION, ADD_QUESTION, EDIT_QUESTION, DEL_QUESTION, EDIT_ORDER, EDIT_TITLE, UPDATE_ORDERS, UPDATE_QUESTION, SET_SID, UPDATE_LOAD, UPDATE_SETTING, DELID
}
from '../actions/adminActions.js';
import update from 'react/lib/update';



const initState = {
	id: '',
	title: '',
	anonymous:1,
	endTime:0,
	collections:0,
	ipConfine:0,
	isRepeat:1,
	questions: [],
	delId: []
};

const view = {
	loading: false
};

const initData = (state = initState, action = null) => {
	switch (action.type) {
		case INIT_QUESTION: //初始化题
			return Object.assign({}, state, action.data, {
				questions: action.data.questions.map(item => Object.assign({}, item, {
					unique: ''
				}))
			});
		case ADD_QUESTION: //添加题
			return Object.assign({}, state, {
				questions: [...state.questions, action.question]
			});
		case EDIT_QUESTION: //修改题
			const op = action.question;
			return Object.assign({}, state, {
				questions: state.questions.map(item => (item.id + item.unique === action.id) ? Object.assign({}, item, op) : item)
			});
		case DEL_QUESTION: //删除题
			return Object.assign({}, state, {
				questions: state.questions.filter(item => (item.id + item.unique) !== action.id)
			});
		case DELID: //删除带id的
			return Object.assign({}, state, {
				delId: [...state.delId, action.delID]
			});
		case UPDATE_QUESTION: //更新排序
			return Object.assign({}, state, {
				questions: update(state.questions, {
					$splice: [
						[action.dragIndex, 1],
						[action.hoverIndex, 0, action.dragQ]
					]
				})
			});
		case EDIT_TITLE: //修改标题
			return Object.assign({}, state, {
				title: action.title
			});
		case UPDATE_SETTING://修改设置
			let sett = {};
			sett[action.name] = action.value;
			return Object.assign({}, state, {
				setting: Object.assign({},state.setting,sett)
			});
		default:
			return state;
	}
}

const loading = (state = view.loading, action) => {
	switch (action.type) {
		case 'UPDATE_LOAD':
			return action.load;
		default:
			return state;
	}
}

const surveyReducers = combineReducers({
	initData,
	loading
});

module.exports = surveyReducers;
