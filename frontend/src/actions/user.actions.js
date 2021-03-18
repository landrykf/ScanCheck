import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_INFO = "UPDATE_INFO";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_BANNER = "UPLOAD_BANNER"
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";


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
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBio = (uid, bio) => {
  const token = localStorage.getItem("token");

  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      whithCredentials: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const updateInfo = (uid, username, email) => {
  const token = localStorage.getItem("token");
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
      // console.log(username)
      // console.log(res);
      dispatch({ type: UPDATE_INFO, payload:  {username, email}  });
    }).catch((err) => console.log(err))
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

export const uploadBanner= (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/uploadbanner`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({type : UPLOAD_BANNER, payload: res.data.banner})
          })
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data : {idToFollow}
    })
      .then((res) => {
        // console.log(res);
        dispatch({type: FOLLOW_USER, payload: {idToFollow}})
      })
      .catch((err) => console.log(err))
  }
}

export const unFollowUser = (followerId, idToUnFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unFollow/` + followerId,
      data : {idToUnFollow},
    })
      .then((res) => {
        // console.log(res);
        dispatch({type: UNFOLLOW_USER, payload: { idToUnFollow }})
      })
      .catch((err) => console.log(err))
  }
}