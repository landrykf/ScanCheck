import axios from "axios";
import { useEffect, useState } from "react";

export const GET_USER = "GET_USER";


export const getUser = () => {
  const token = localStorage.getItem("token");

  
  return async (dispatch) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/me/`,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);

      });
  };
};
