import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer/usersReducer";

export default configureStore({
	reducer: {
		users: usersReducer
	}
})