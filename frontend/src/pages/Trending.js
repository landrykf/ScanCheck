import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Trending = () => {

    // let [email, setEmail] = useState('');
    // let [password, setPassword] = useState('');
    // let [username, SetUsername] = useState('');
    // let [bio,SetBio] = useState('');

    let [profilUsername, setProfilUsername] = useState('')
    let [authorization, setAutorization] = useState('')

    // let profilUsername = document.querySelector('.profil-username');
    
    // let profilBio = document.querySelector('.profil-bio');

    // console.log(profilUsername);


    

      const token = localStorage.getItem('token');

        axios({
        method: "get",
        url:`${process.env.REACT_APP_API_URL}api/users/me/`,
        whithCredentials: false, 

        headers: {
            'Authorization': `Bearer ${token}`,
          },    
         
        })

    .then((res)=> {
        // console.log(res); 
        setProfilUsername = res.data.user.username ;
        setAutorization = res.config.headers.Authorization;
        // console.log(setAutorization) 
        // profilBio.innerHTML = res.data.user.bio   
    })
    .catch((err)=>{
        console.log(err)
        // window.location = `/profil`        
    })


      
    return (
        <div>                
            ma page de profil    
            <ul>
                <li className= "profil-username">{profilUsername}</li>
                <li className= "profil-bio"></li>
            </ul>
        </div>
    );
    
};

export default Trending;