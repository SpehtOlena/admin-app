import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Sale from "../pages/Sale/Sale";
import Profile from "../pages/Profile/Profile"
import NotFound from "../Components/NotFound/NotFound";
import Users from "../pages/Users/Users";
import UserPage from "../pages/UserPage/UserPage";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "home",
				element: <Home />
			},
			{
				path: "sale",
				element: <Sale />
			},
			{
				path: "profile",
				element: <Profile />
			},
			{
				path: "users",
				element: <Users />
			},
			{
				path: "users/:userId",
				element: <UserPage />
			}
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
])