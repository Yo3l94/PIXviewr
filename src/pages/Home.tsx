import React, { useEffect } from "react";
import { useHistory } from "react-router";
import ErrorScreen from "../components/ErrorScreen";
import SectionsList from "../components/SectionsList";
import { useAppSelector } from "../hooks";

export const Home = () => {
	const isLoading = useAppSelector(state => state.isLoading)
	// return error === ''
	// ? (
	return isLoading
		? <div>Loading...</div>
		: <SectionsList />
	// )
	// : <ErrorScreen error={error}
	// />;
};
