import React from 'react';
import {useEffect, useState} from "react";
import Routes from "./components/routes";
import {UidContext} from "./components/AppContext"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getUser } from './actions/user.actions';

function App() {
  const [uid, setUid] = useState(null);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url:`${process.env.REACT_APP_API_URL}api/users/me/`,
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${token}`,
        },  

      })
      .then((res) =>{
        // console.log(res)
        setUid(res.data)
      })
      .catch((err) =>{
         console.log('no token '+ err)
      })
    };
    fetchToken();

    try {
      
      dispatch(getUser())      

    } catch (err) {
      console.log(err)
    }

 
  }, []);





  return (
    <div className="App">
      <UidContext.Provider value={uid}>
      <header className="App-header">

        <h1> Ici mon app react </h1>
        <Routes />

      </header>
      </UidContext.Provider>

    </div>
  );
}

export default App;
