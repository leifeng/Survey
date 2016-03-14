import {combineReducers} from 'redux';
import {SET_QUESTION,SET_VALUE,GET_BOOL,SET_BOOL} from '../actions/index.js';
const indexState = {};
const questionState = [];

const question = (state = questionState, action = null)=> {
    switch (action.type) {
        case SET_QUESTION:
            return action.question;
        default:
            return state;
    }
};

const boolState = (state = indexState, action = null)=> {
    switch (action.type) {
        case GET_BOOL:
            return indexState[action.index];
        case SET_BOOL:
            const key = action.index;
            return Object.assign({}, indexState, {key: true});
        default:
            return state;
    }
};


const answer = (state = questionState, action = null)=> {
    switch (action.type) {
        case SET_VALUE:
            let b = boolState(indexState, {type: GET_BOOL, index: action.id});
            if (b) {
                return state.map(item=>item.id === action.id ? {id: action.id, value: action.value} : item)
            } else {
                boolState(indexState, {type: SET_BOOL, index: action.id});
                return [...state, {id: action.id, value: action.value}]
            }
        default:
            return questionState;

    }
};
const surveyReducers = combineReducers({
    answer,
    question
});
module.exports = surveyReducers;