/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { routes } from "./Routes";
import { Route, RouteProps, HashRouter } from "react-router-dom";

/* eslint-enable @typescript-eslint/no-unused-vars */

import "./App.gstyle.css";

export const App = (): JSX.Element => <div className="app">
	<HashRouter>
		{routes.map((route: RouteProps) => <Route key={route.path as string} {...route} />)}
	</HashRouter>
</div>;
