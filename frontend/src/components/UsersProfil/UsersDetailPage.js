import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserProfil } from "./UserProfil";

export const UsersDetailPage = (props) => {
  const users = useSelector((state) => state.usersReducer);
  console.log(users);
    


  return (
    <div>
      <div>
          <div>
            {users.length > 0 && users.map((user) => {
              console.log(user);
              return (
                <div className="profil-page-container" key={user._id}>
                  {user._id === props.match.params.userId && (
                      <>
                      <UserProfil user = {user} />
                    </>
                  )}
                </div>
              );
            })} 
          </div>
        
      </div>
    </div>
  );
};
