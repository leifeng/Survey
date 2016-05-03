import fetch from 'isomorphic-fetch';

export const INIT_SURVEY = 'INIT_SURVEY';
export const SET_VALUE = 'SET_VALUE';
export const SET_ID='SET_ID';
export const UPDATE_MSG='UPDATE_MSG'

//设置问卷数据
export const initSurvey = (data) => {
    return {
        type: INIT_SURVEY,
        data
    }
}

//异步获取数据
export const getQuestionData = (id) => {
    return dispatch => {
        return fetch('/index/get/sid/'+id).
        then(res => res.json()).
        then(json => dispatch(initSurvey(json.data)))
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

export const setId=(id)=>{
    return {
        type:SET_ID,
        id
    }
}

//发送答案
export const postAnswer = () => {
    return (dispatch, getState) => {
        return fetch('/index/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getState().answers)
        }).then(req=>req.json()).then(json=>{
            if(json.errnum===0){
                dispatch(updateMsg({err:'success',msg:'回答成功',hidden:0}))
            }else{
                dispatch(updateMsg({err:'error',msg:json.errmsg,hidden:0}))
            }
        })
    }
}

export const updateMsg=(data)=>{
    return {
        type:UPDATE_MSG,
        data
    }
}
