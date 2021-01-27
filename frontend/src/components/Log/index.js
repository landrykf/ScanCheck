import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Log = () => {
    const [registeModal, setRegisterModal] = useState(true); //hooks
    const [loginModal, setLoginModal] = useState(false);


    let handleModal = (event)=>{
        if(event.target.id === "register"){
            setLoginModal(false);
            setRegisterModal(true);
        }else if (event.target.id === "login") {
            setRegisterModal(false);
            setLoginModal(true);
        }
        console.log(event.target)
    }

    return(
        <div className="login-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModal} id="register">S'inscrire</li>
                    <li onClick={handleModal}id="login">Se connecter</li>
                </ul>
                {registeModal && <RegisterForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    )
}

export default Log ;