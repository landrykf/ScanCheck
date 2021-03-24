import React, { useEffect, useState } from "react";
import { SingleComment } from "./SingleComment";

export const ReplyComment = (props) => {
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

  let renderReplyComment = (parentCommentId) => {
    props.commentList.map((comment) => (

        <React.Fragment>
            
            {comment.responseTo === parentCommentId && (
              <div>
              {console.log(parentCommentId)}
  
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
              </div>
            )}
        </React.Fragment>

    ));
  };

  const handleChange = () => {
    setOpenReplyComment(!openReplyComment);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p onClick={handleChange}>Voir {childCommentNumber} réponse(s)</p>
      )}
      {openReplyComment && renderReplyComment(props.parentCommentId)}
    </div>
  );
};
