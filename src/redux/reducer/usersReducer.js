import { CREATE_USER, DELETE_USER, EDIT_USER, ERROR, GET_USER, GET_USERS, LOADING } from "../types"

const initialState = {
	data: [],
	item: {},
	loading: true,
	error: {},
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS: {
			return { ...state, data: action.payload }
		}
		case GET_USER: {
			return { ...state, item: action.payload }
		}
		case CREATE_USER: {
			return { ...state, data: [...state.data, action.payload] }
		}
		case EDIT_USER: {
			return {
				...state, data: state.data.map(value => {
					if (value.id === action.payload.id) {
						return action.payload
					} else {
						return value
					}
				})
			}
		}
		case DELETE_USER: {
			return {
				...state, data: state.data.filter(value => value.id !== action.payload.id)
			}
		}
		case LOADING: {
			return { ...state, loading: action.payload }
		}
		case ERROR: {
			return { ...state, error: action.payload }
		}
		default: {
			return state
		}
	}
}