import { RouteProps } from "react-router-dom";
import { Home } from "./pages/Home";

export const routes = [
	{
		path: ["/"],
		component: Home,
		exact: true
	},
] as RouteProps[];
