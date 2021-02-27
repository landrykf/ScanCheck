import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const RegisterForm = () => {
  let [formSubmit, setFormSubmit] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [controlPassword, setControlPassword] = useState("");

  let handleRegister = async (event) => {
    event.preventDefault();

    let emailError = document.querySelector(".email.error");
    let usernameError = document.querySelector(".username.error");
    let passwordError = document.querySelector(".password.error");
    let controlPasswordError = document.querySelector(".passwordControl.error");
    let terms = document.getElementById("terms");
    console.log(terms.checked);
    let termsError = document.querySelector(".terms.error");
    controlPasswordError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        controlPasswordError.innerHTML =
          "les mots de passe ne correspondent pas";

        }
        if (!terms.checked) {
          termsError.innerHTML = "veuillez accepter les conditions générales";
        }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register/`,
        whithCredentials: false,
        data: {
          email,
          password,
          username,
        },
      })
        .then((res) => {
          console.log(res);
          setFormSubmit(true)

          // window.location = "/";
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data) {
            
            emailError.innerHTML = err.response.data.error;
            passwordError.innerHTML = err.response.data.error;
            usernameError.innerHTML = err.response.data.error;
          }else{
            setFormSubmit(true)
          }
        });
    }
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <LoginForm />
          <h4 className="success">
            {" "}
            Enregistrement reussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        
        
        <form action="" onSubmit={handleRegister} id="form-register">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          />
        <div className="email error"></div>

        <label htmlFor="username">Nom d'utilisateur</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          />
        <div className="username error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          />
        <div className="password error"></div>
        <br />

        <label htmlFor="controlPassword"> Confirmez le mot de passe</label>
        <br />
        <input
          type="password"
          name="controlPassword"
          id="controlPassword"
          onChange={(event) => setControlPassword(event.target.value)}
          value={controlPassword}
          />
        <div className="passwordControl error"></div>
        <br />
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          J'accepte les{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">
            condition générale
          </a>
        </label>
        <div className="terms error"></div>
        <br />
        <input type="submit" value="S'inscrire" />
      </form>
    )}
    </div>
  );
};

export default RegisterForm;
