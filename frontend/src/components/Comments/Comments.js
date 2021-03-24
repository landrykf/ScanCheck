import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReplyComment } from "./Section/ReplyComment";
import { SingleComment } from "./Section/SingleComment";

export const Comments = (props) => {
  const user = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writer: user._id,
      mangaId: props.mangaId,
    };

    axios.post("/api/manga/save-comment", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        console.log("Failed to save Comment");
      }
    });
  };
  return (
    <div className="comments-container">
      <h3>partagez votre avis sur {props.mangaTitle}</h3>
      
      {props.commentList && props.commentList.map((comment) => (
            
          (!comment.responseTo && 
            <React.Fragment>
              <SingleComment
                comment={comment}
                mangaId={props.mangaId}
                refreshFunction={props.refreshFunction}
              />
              <ReplyComment
                commentList={props.commentList}
                mangaId={props.mangaId}
                parentCommentId={comment._id}
                refreshFunction={props.refreshFunction}
              />
            </React.Fragment>
          )
        ))}

      {props.commentList && props.commentList.length === 0 && (
        <h2> Soyez le premier à partager votre avis sur {props.mangaTitle}</h2>
      )}

      {/* Liste des commentaires */}

      <form onSubmit={onSubmit}>
        <textarea
          onChange={handleChange}
          cols="120"
          rows="3"
          value={comment}
          placeholder="Ajouter un commentaire"
        ></textarea>
        <button onClick={onSubmit}>Envoyer</button>
      </form>
    </div>
  );
};
