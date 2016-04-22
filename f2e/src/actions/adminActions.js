
import fetch from 'isomorphic-fetch';

export const INIT_QUESTION='INIT_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DEL_QUESTION = 'DEL_QUESTION';
export const UPDATE_QUESTION='UPDATE_QUESTION';
export const DELID='DELID';
export const EDIT_TITLE='EDIT_TITLE';

export const SET_SID='SET_SID';
//view
export const UPDATE_LOAD='UPDATE_LOAD';
export const UPDATE_SETTING='UPDATE_SETTING';

export const initQuestion=(data)=>{
	return{
		type:INIT_QUESTION,
		data
	}
}

export const getQuestion=(id)=>{
	return dispatch=>{
		return fetch('/admin/survey/get/'+id,{
			credentials: 'same-origin'
		})
		.then(res=>res.json())
		.then(json=>dispatch(initQuestion(json)));
	}
}

export const addQuestion=(question)=>{
	return{
		type:ADD_QUESTION,
		question
	}
}

export const editQuestion=(id,question)=>{
	return{
		type:EDIT_QUESTION,
		id,
		question
	}
}

export const delQuestion=(id)=>{
	return{
		type:DEL_QUESTION,
		id
	}
}
export const delId=(delID)=>{
	return{
		type:DELID,
		delID
	}
}

export  const updateQuestion=(dragIndex,hoverIndex,dragQ)=>{
	return{
		type:UPDATE_QUESTION,
		dragIndex,
		hoverIndex,
		dragQ
	}
}


export const editTitle=(title)=>{
	return {
		type:EDIT_TITLE,
		title
	}
}


export const setSid=(id)=>{
	return {
		type:SET_SID,
		id
	}
}

export const updateLoad=(load)=>{
	return {
		type:UPDATE_LOAD,
		load
	}
}

export const postSurvey=(status,cb)=>{
	return (dispatch,getState)=>{
		fetch('/admin/survey/edit',{
			method: 'post',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			credentials: 'same-origin',
			body:JSON.stringify(Object.assign({},getState().initData,{status:status}))
		})
		.then(res=>res.json())
		.then(json=>{
			if(json.msg==='OK'){
				dispatch(updateLoad(false))
				cb('success');
			}
		})
		.catch(ex=>{
			console.log(ex)
		});
	}
}

export const updateSetting=(name,value)=>{
	return {
		type:UPDATE_SETTING,
		name,
		value
	}
}