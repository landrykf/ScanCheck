import React, { useState } from 'react';
import axios from 'axios';
  

const LoginForm = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')


    let handleLogin = (event) =>{
        event.preventDefault();
        let emailError = document.querySelector('.email.error');
        let passwordError = document.querySelector('.password.error');


        axios({
            method: "post",
            url:`${process.env.REACT_APP_API_URL}api/user/login`,
            whithCredentials: false,
            data:{
                email,
                password,                
            }
        })
        // console.log(axios1)
        .then((res)=> {
            // console.log(res);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            window.location = `/profil`
            
        })
        .catch((err)=>{
            // console.log(err.response.data.error)
            // console.log(err.response)
                if (err.response.data.error === "mot de passe invalid" ) {
                    passwordError.innerHTML = err.response.data.error;
                    
                } else if (err.response.data.error === "l'utlisateur n'existe pas dans la BDD") {
                    emailError.innerHTML = err.response.data.error;                  
                } else{

                    emailError.innerHTML = err.response.data.error;
                    passwordError.innerHTML = err.response.data.error;
                }
            
        })

    }
    return(
        <form action="" onSubmit={handleLogin} id= "form-login">
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
            
            
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <input type="submit" value="Se connecter"/>
        </form>
    )
}

export default LoginForm;