import React, { useState } from 'react';
import axios from 'axios';


const RegisterForm = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [username, setUsername]= useState('');
    

    let handleRegister=(event)=>{
        event.preventDefault();
        let emailError = document.querySelector(".email.error");
        let passwordError = document.querySelector(".password.error");
        let usernameError = document.querySelector(".username.error");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/users/register/`,
            whithCredentials: false,
            data:{
                email,
                password,
                username
            }

        })
        .then((res) => {
            console.log(res)
            window.location = '/';

        })
        .catch((err)=>{
            console.log(err.response)

            emailError.innerHTML = err.response.data.error;
            passwordError.innerHTML = err.response.data.error;
            usernameError.innerHTML = err.response.data.error;
        })

    }

    return(
        <div>
          <form action= "" onSubmit={handleRegister}  id="form-register">
            <label htmlFor="email">Email</label>
            <br/>
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(event) => setEmail(event.target.value)}
                value={email}
            />
            <div className="email error"></div>

          <label htmlFor="username">Nom d'utilisateur</label>
          <br/>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(event)=> setUsername(event.target.value)}
            value={username}
          />
          <div className="username error"></div>
        <br/>
        <label htmlFor="password">Mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event)=> setPassword(event.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br/>

          <input type="submit" value="S'inscrire"/>

          </form>
       </div>

    )
}

export default RegisterForm;