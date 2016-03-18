
export const ADD_QUESTION = 'ADD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DEL_QUESTION = 'DEL_QUESTION';
export const EDIT_ORDER='EDIT_ORDER';
export const EDIT_TITLE='EDIT_TITLE';
export const UPDATE_ORDERS='UPDATE_ORDERS';


export const addQuestion=(option)=>{
	return{
		type:ADD_QUESTION,
		option
	}
}

export const editQuestion=(order,option)=>{
	return{
		type:EDIT_QUESTION,
		order,
		option
	}
}

export const delQuestion=(order)=>{
	return{
		type:DEL_QUESTION,
		order
	}
}

export const editOrder=(orders)=>{
	return{
		type:EDIT_ORDER,
		orders
	}
}

export const editTitle=(title)=>{
	return {
		type:EDIT_TITLE,
		title
	}
}

export const updateOrders=(orders)=>{
	return{
		type:UPDATE_ORDERS,
		orders
	}
}

