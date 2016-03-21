
export const ADD_QUESTION = 'ADD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DEL_QUESTION = 'DEL_QUESTION';
export const EDIT_TITLE='EDIT_TITLE';
export const UPDATE_QUESTION='UPDATE_QUESTION';

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


