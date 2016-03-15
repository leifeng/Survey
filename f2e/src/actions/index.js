var a = {
    style: {
        bgColor: '#fff',
        title: {
            color: '#000',
            size: '12px'
        },
        option: {
            color: '#111',
            size: '14px;'
        }
    },
    setting: {
        login: false,
        share: true
    },
    //页面请求来的题
    question: [
        {
            type: 1,
            id: 1000,
            title: '这是单选问题',
            options: ['选项1', '选项2', '选项3']
        }, {
            type: 2,
            id: 10001,
            title: '这是多选问题',
            options: ['选项1', '选项2', '选项3']
        }, {
            type: 3,
            id: 10002,
            title: '这是填空题'
        }, {
            type: 4,
            id: 10003,
            title: '排序题',
            options: ['第一', '第二', '第三']
        }
    ]
};
//发送到后台答案
var answer = {
    a_1000: true
} [
    {id: 1000, value: '选项1'},
    {id: 1001, value: '选项1,选项3'},
    {id: 1003, value: '填空题答案是xxxxxxx'},
    {id: 1004, value: ['第三', '第一', '第三']}
    ];


import fetch from 'isomorphic-fetch';

export const GET_QUESTION = 'GET_QUESTION';
export const SET_QUESTION = 'SET_QUESTION';

export const SET_VALUE = 'SET_VALUE';

export const SET_INDEX_INFO = 'SET_INDEX_INFO';

export const getQuestionData = ()=> {
    return dispatch=> {
        return fetch('/data').
            then(res=>res.json()).
            then(json=>dispatch(setQuestion(json)))
    }
};

export const setQuestion = (question)=> {
    return {
        type: SET_QUESTION,
        question
    }
};

export const setAnswerValue = (id, value)=> {
    return {
        type: SET_VALUE,
        id,
        value
    }
};

