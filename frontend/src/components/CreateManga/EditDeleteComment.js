import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { editComment } from "../../actions/manga.actions"
export const EditDeleteComment = ({ comment, mangaId }) => {
  const [isAuthor, SetIsAuthor] = useState(false);
  const [edit, SetEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
      e.preventDefault()
    if (text) {
        dispatch(editComment(mangaId, comment._id, text));
        setText('');
        SetEdit(false)
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        SetIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  console.log(uid);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => SetEdit(!edit)}>
          <img src="./icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => SetEdit(!edit)}>
            {" "}
            Editer{" "}
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <input type="submit" value="Valider changement" />
        </form>
      )}
    </div>
  );
};
