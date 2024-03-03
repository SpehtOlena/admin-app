import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducer/counterReducer";
import { usersReducer } from "./reducer/usersReducer";
import { postsReducer } from "./reducer/postsReducer";


export default configureStore({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
		posts: postsReducer
	}
}

)