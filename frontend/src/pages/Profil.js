import React from 'react';
import {useContext} from 'react'
import Log from '../components/Log'
import {UidContext} from '../components/AppContext';
import Navbar from '../components/Navbar';


const Profil = () => {
    const uid = useContext(UidContext)
    console.log(uid);
    return(
        
        <div className='profil-page' >
            {uid? (
                <div>
                     <Navbar /> 
                    {/* <h2>UPDATE PAGE</h2> */}
                </div>
                
            ): (

            <div className="log-container">
                <h1>Page de profil</h1>
                <Log signin = {true} signup={false}/>
            </div>

            )}
        </div>
    );

};

export default Profil;