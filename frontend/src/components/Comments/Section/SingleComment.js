import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const SingleComment = (props) => {
  const user = useSelector((state) => state.userReducer);
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);

  //Réponse aux commentaires

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user._id,
      mangaId: props.mangaId,
      responseTo: props.comment._id,
      content: commentValue,
    };

    axios.post("/api/manga/save-comment", variables)
    .then((response) => {
        console.log(response.data);
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!openReply);
        props.refreshFunction(response.data.result);
      } else {
        console.log("Failed to save single Comment");
      }
    });
  };

  return (
    <>
      <article className="comment">
        <div className="top">
          <div className="author">
            <img src={"." + props.comment.writer.picture} alt="writer pics" />
          </div>

          <div className="remove-zone">
            <span>X</span>
          </div>
          <div className="holder">
            <div className="author-label">
              <h3>{props.comment.writer.username}</h3>
              <p>{props.comment.createdAt}</p>
            </div>
            {/* <div className="">{console.log(props)}</div> */}
          </div>
        </div>

        <blockquote className="original">{props.comment.content}</blockquote>
        <span onClick={handleOpenReply}> Répondre </span>
      </article>

      {openReply && (
        <form onSubmit={onSubmit}>
          <textarea
            onChange={handleChange}
            cols="120"
            rows="3"
            value={commentValue}
            placeholder="Repondre"
          />
          <button onClick={onSubmit}>Envoyer votre réponse</button>
        </form>
      )}
    </>
  );
};
