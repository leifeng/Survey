var a = {
    id: 1,
    title: '',
    createTime: '',
    endTime: '',
    status: '',
    author: '',
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
    questions: [{
        kind: 1,
        id: 1000,
        title: '这是单选问题',
        answers: ['选项1', '选项2', '选项3']
    }, {
        kind: 2,
        id: 10001,
        title: '这是多选问题',
        answers: ['选项1', '选项2', '选项3']
    }, {
        kind: 3,
        id: 10002,
        title: '这是填空题'
    }, {
        kind: 4,
        id: 10003,
        title: '排序题',
        answers: ['第一', '第二', '第三']
    }]
};
//发送到后台答案
var answer = [{
    id: 1000,
    value: '选项1'
}, {
    id: 1001,
    value: '选项1,选项3'
}, {
    id: 1003,
    value: '填空题答案是xxxxxxx'
}, {
    id: 1004,
    value: ['第三', '第一', '第三']
}];


import fetch from 'isomorphic-fetch';


export const INIT_SURVEY = 'INIT_SURVEY';
export const SET_VALUE = 'SET_VALUE';


//设置问卷数据
export const initSurvey = (data) => {
    return {
        type: INIT_SURVEY,
        data
    }
}

//异步获取数据
export const getQuestionData = () => {
    return dispatch => {
        return fetch('/app/survey/').
        then(res => res.json()).
        then(json => dispatch(initSurvey(json)))
    }
};

//设置答案
export const setAnswerValue = (id, value) => {
    return {
        type: SET_VALUE,
        id,
        value
    }
};

//发送答案
export const postAnswer = () => {
    return (dispatch, getState) => {
        return fetch('/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getState())
        }).then(req=>req.json).then(json=>{console.log(json)})
    }
}