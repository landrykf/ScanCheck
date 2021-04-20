import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LikeDislikes } from "../../LikeDislikes/LikeDislikes";
import { SingleComment } from "./SingleComment";

export const ReplyComment = (props) => {
  const user = useSelector((state) => state.userReducer);

  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);

  const handleChange = () => {
    setOpenReplyComment(!openReplyComment);
  };

  return (
    <div className="response-container">
      {childCommentNumber > 0 && (
        <h5 className="reply" onClick={handleChange}>Voir {childCommentNumber} réponse(s)</h5>
      )}
      {openReplyComment &&
        props.commentList.map(
          (comment) =>
            comment.responseTo === props.parentCommentId && (
              <div className="response-to-comment">
                <div className="top">
                  <div className="author">
                    <img src={comment.writer.picture} alt="writer pics" />
                  </div>

                  <div className="remove-zone">
                    <span>X</span>
                  </div>
                  <div className="holder">
                    <div className="author-label">
                      <h3>{comment.writer.username}</h3>
                      <h5>{comment.createdAt}</h5>
                    </div>
                  </div>
                </div>
                <p>{comment.content}</p>
                <LikeDislikes commentId={comment._id} userId={comment.writer._id} />
              </div>
            )
        )}
    </div>
  );
};
