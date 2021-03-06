import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

export const FollowHander = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, SetIsFollowed] = useState(false);

  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    SetIsFollowed(true);
  };

  const handleUnfollow = () => {
      dispatch(unFollowUser(userData._id, idToFollow));
      SetIsFollowed(false)
      // console.log(unFollowUser);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        SetIsFollowed(true);
      } else SetIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick = {handleUnfollow}>
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick = {handleFollow}>
          <button className="follow-btn">suivre</button>
        </span>
      )}
    </>
  );
};
