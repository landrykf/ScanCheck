import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mangaReducer from "../../reducers/manga.reducer";
import {addComment, getMangas} from "../../actions/manga.actions"
import { FollowHander } from "../Profil/FollowHander";
import { isEmpty } from "../Utils";
import {EditDeleteComment} from './EditDeleteComment'
export const CardComments = ({manga}) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  console.log(manga);

  const handleComment = (e) => {
      e.preventDefault()

      if(text) {
        dispatch(addComment(manga._id , userData._id, text, userData.pseudo))
            .then(() => dispatch(getMangas()))
            .then(() => SetText(''))
      }
  };

  return (
    <div className="comments-container">
      {manga.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      console.log(comment.commenterId);
                      if (user._id === comment.commenterId) return user.picture;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
                <div className="comment-header">
                    <h3>{comment.commenterUsername}</h3>
                    {comment.commenterId !== userData._id && (
                        <FollowHander idToFollow={comment.commenterId} type = {'card'} />
                    )}
                </div>
                <p>{comment.text}</p>
                <EditDeleteComment comment={comment} mangaId = {manga._id}/>
            </div>
          </div>
        );
      })}

      {userData._id && (
          <form action="" onSubmit = {handleComment} className = "comment-form">
              <input type="text" name="text" onChange = {(e) => SetText(e.target.value)} value={text} placeholder="Entrer votre commentaire ici" />
              <br/>
              <input type="submit" value="envoyer"/>
          </form>
      )}
      
    </div>
  );
};
