import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { StyledWrapper } from "../layout/Wrappers";

const errorContentArr = {
  404: {
    text: "Nic nie znaleziono.",
    img: require("../assets/images/undraw_not_found_60pq.svg"),
  },
  500: {
    text: "Błąd połączenia.",
    img: require("../assets/images/undraw_server_down_s4lk.svg"),
  },
};

const ErrorScreen = () => {
  const error: keyof typeof errorContentArr = useAppSelector(state => state.error)
  const dispatch = useDispatch()
  console.log(error);

  useEffect(() => {
    return () => {
      dispatch({ type: "topics/clearError" })
    }
  }, [error])
  return (
    <StyledWrapper>
      {!(error in errorContentArr) && <h1>Oh no, something went wrong! 😭</h1>}
      <Link to="/">
        Go Home
      </Link>
      <img src={errorContentArr[error]?.img} alt="" />
      <h3>
        {errorContentArr[error]?.text}
      </h3>
    </StyledWrapper>
  );
};

export default ErrorScreen;