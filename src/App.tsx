import React from "react";
import { Provider } from "react-redux";
import "./style.css";
import store from "./store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SectionView } from "./components/SectionView";
import NotFound from "./pages/NotFound";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import ErrorScreen from "./components/ErrorScreen";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<AppWrapper>
					<Switch>
						<Route component={Home} exact path="/" />
						<Route component={About} path="/about" />
						<Route component={SectionView} path="/sectionView" />
						<Route component={ErrorScreen} path="/error" />
						<Route component={NotFound} />
					</Switch>
				</AppWrapper>
			</Router>
		</Provider>
	);
};

export default App;

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`