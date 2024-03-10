import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, GET_DATA, GET_ITEM, USER_ERROR } from "../types"

const initialState = {
	data: [],
	item: {},
	error: null
}

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DATA: {
			return { ...state, data: action.payload }
		}
		case GET_ITEM: {
			return { ...state, item: action.payload }
		}
		case CREATE_ITEM: {
			return { ...state, data: [...state.data, action.payload] }
		}
		case EDIT_ITEM: {
			return {
				...state, data: state.data.map(value => {
					if (value.id === action.payload.id) {
						return action.payload
					} else {
						return state
					}
				})
			}
		}
		case DELETE_ITEM: {
			return {
				...state, data: state.data.filter(value => value.id !== action.payload.id)
			}
		}
		case USER_ERROR: {
			return { ...state, error: action.payload }
		}
		default:
			return state
	}
}