import React from "react";
import { useEffect, useState } from "react";
import Routes from "./components/routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
// import { getUsers } from './actions/users.actions';

// part 2
// import './styles/App.css'
import "./lib/font-awesome/css/all.min.css";

function App() {
  const [uid, setUid] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log("no token " + err);
        });
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch, token]);

  return (
    <div className="App">
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
}

export default App;
