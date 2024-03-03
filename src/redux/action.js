import axios from "axios";
import { DECREMENT, ERROR, GET_POST, GET_POSTS, GET_USER, GET_USERS, INCREMENT, LOADING } from "./types";

// COUNTER
export function increment(data) {
	return {
		type: INCREMENT,
		payload: data + 1
	}
}

export function decrement(data) {
	return {
		type: DECREMENT,
		payload: data - 1
	}
}

// USERS
const URL = 'http://localhost:3000/';

export function getUsers() {
	return async dispatch => {
		dispatch(loading(true))
		axios
			.get(`${URL}users`)
			.then(res => {
				dispatch({
					type: GET_USERS,
					payload: res.data
				})
			})
			.then(() => {
				dispatch(loading(false))
			})
			.catch((error) => {
				dispatch(loading(false));
				dispatch(errorUsers(error))
			})
	}
}

export function getUser(user) {
	return async dispatch => {
		axios
			.get(`${URL}users/${user.id}`)
			.then(res => {
				dispatch({
					type: GET_USER,
					payload: res.data
				})
			})
	}
}

export function loading(bool) {
	return {
		type: LOADING,
		payload: bool
	}
}

export function errorUsers(obj) {
	return {
		type: ERROR,
		payload: obj
	}
}

// POSTS
export function getPosts() {
	return async dispatch => {
		axios
			.get(`${URL}posts`)
			.then(res => {
				dispatch({
					type: GET_POSTS,
					payload: res.data
				})
			})
	}
}

export function getPost(post) {
	return async dispatch => {
		axios
			.get(`${URL}posts/${post.id}`)
			.then(res => {
				dispatch({
					type: GET_POST,
					payload: res.data
				})
			})
	}
}