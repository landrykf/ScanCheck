import React from 'react';
import { Uid } from "../components/AppContext";
import UpdateProfil from "../components/Setting/UpdateProfil";
import Navbar from "../components/Navbar"
function Account() {
    return (
        <div>
            <Navbar/>
            <UpdateProfil/>
        </div>
    )
}

export default Account
