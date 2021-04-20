import axios from "axios";
import React, { useEffect, useState } from "react";

export const LikeDislikes = (props) => {
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);

  const variable = {
    commentId: props.commentId,
    userId: props.userId,
  };

  useEffect(() => {
    axios.post("/api/manga/getLikes", variable).then((response) => {
      if (response.data.success) {
        //nombre de like du commentaire
        setLikes(response.data.likes.length);
        //Déja liké?
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        console.log("failed to get likes");
      }
    });
  });

  const onLike = () => {
    if (likeAction === null) {
      axios.post("/api/manga/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");
        } else {
          console.log("Failed to increase like");
        }
      });
    } else {
      axios.post("/api/manga/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          console.log("Failed to decrease the like");
        }
      });
    }
  };

  return (
    <div className="like-button" onClick={onLike}>
      {likeAction === "liked" ? (
        <img src="../icons/heart-filled.svg" alt="heart" />
      ) : (
        <img src="../icons/heart.svg" alt="heart" />
      )}
      <span>{likes}</span>
    </div>
  );
};
