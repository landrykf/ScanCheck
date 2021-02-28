import React from 'react';
import {useEffect, useState} from "react";
import Routes from "./components/routes";
import {UidContext} from "./components/AppContext"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getUser } from './actions/user.actions';

// part 2
import './styles/App.css'
import './lib/font-awesome/css/all.min.css'

function App() {
  const [uid, setUid] = useState(null);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url:`${process.env.REACT_APP_API_URL}jwtid`, 
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

  //   try {
      
  //     dispatch(getUser(uid))      

  //   } catch (err) {
  //     console.log(err)
  //   }

 
  // }, []);
  if (uid) dispatch(getUser(uid));
}, [uid, dispatch]);





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
