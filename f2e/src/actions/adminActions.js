
import fetch from 'isomorphic-fetch';
//import fetchJsonp  from "fetch-jsonp";
export const ADD_QUESTION = 'ADD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DEL_QUESTION = 'DEL_QUESTION';
export const UPDATE_QUESTION='UPDATE_QUESTION';

export const EDIT_TITLE='EDIT_TITLE';

export const SET_SID='SET_SID';
//view
export const UPDATE_LOAD='UPDATE_LOAD';
export const UPDATE_OPTIONS='UPDATE_OPTIONS';


export const addQuestion=(option)=>{
		return{
			type:ADD_QUESTION,
			option
		}
}

export const editQuestion=(id,option)=>{
	return{
		type:EDIT_QUESTION,
		id,
		option
	}
}

export const delQuestion=(id)=>{
	return{
		type:DEL_QUESTION,
		id
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


export const setSid=(sid)=>{
	return {
		type:SET_SID,
		sid
	}
}

export const updateLoad=(load)=>{
	return {
		type:UPDATE_LOAD,
		load
	}
}

export const postSurvey=()=>{
	return (dispatch,getState)=>{
		fetch('/admin/post/survey/edit',{
			method: 'post',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			body: JSON.stringify(getState())
		})
		.then(res=>res.json())
		.then(json=>{
			if(json.msg){
				dispatch(updateLoad(false))
			}
		})
		.catch(ex=>{
			console.log(ex)
		});
	}
}

export const updateOptions=(name,value)=>{
	return {
		type:UPDATE_OPTIONS,
		name,
		value
	}
}