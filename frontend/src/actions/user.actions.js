import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_INFO = "UPDATE_INFO";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  const token = localStorage.getItem("token");
  // console.log(token);

  return async (dispatch) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBio = (userId, bio) => {
  const token = localStorage.getItem("token");

  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      whithCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { bio },
    })
      .then((res) => {
        // console.log(res)
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const updateInfo = (username, email, uid) => {
  const token = localStorage.getItem("token");
  console.log({ username });

  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      whithCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        username,
        email,
      },
    }).then((res) => {
      console.log(res);
      dispatch({ type: UPDATE_INFO, payload: { username, email } });
    });
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({type : UPLOAD_PICTURE, payload: res.data.picture})
          })
      })
      .catch((err) => console.log(err));
  };
};
