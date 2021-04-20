import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import { UserProfil } from "./UserProfil";

export const UsersDetailPage = (props) => {
  const users = useSelector((state) => state.usersReducer);

  return (

        <div>
          <Navbar />

          {users.length > 0 &&
            users.map((user) => {
              return (
                <div className="profil-page-container" key={user._id}>
                  {user._id === props.match.params.userId && (
                    <>
                      <UserProfil
                        bodyModal={true}
                        followersModal={false}
                        followingsModal={false}
                        user={user}
                      />
                    </>
                  )}
                </div>
              );
            })}
        </div>

  );
};
