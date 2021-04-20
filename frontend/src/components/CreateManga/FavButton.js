import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { faveManga, unFaveManga } from '../../actions/manga.actions'

export const FavButton = ({ manga }) => {
  const [faved, SetFaved] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();


  const fave = () => {
    dispatch(faveManga(manga._id, uid))
    SetFaved(true);
  };

  const unfave = () => {
      dispatch(unFaveManga(manga._id, uid))
      SetFaved(false)
  };

  //Est-ce que l'id de l'utilisateur est dans le tableau "manga.likers"? si oui faved(true). on relance le useEffect quand l'uid est défini, quand on a le tableau manga.likers et si liked change

  useEffect(() => {
    if (manga.likers.includes(uid)) SetFaved(true);
    // else SetFaved(false)
  }, [uid, manga.likers, faved]);

  return (
    <div className="fav-container">
      {uid === null && (
        <Popup
          trigger={<img src="../icons/heart.svg" alt="fav" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour liker ce manga</div>
        </Popup>
      )}

      {uid && faved === false && (
        <img src="../icons/heart.svg" alt="fav" onClick={fave} />
      )}

      {uid && faved && (
        <img src="../icons/heart-filled.svg" alt="fav" onClick={unfave} />
      )}
      <span>{manga.likers.length}</span>
    </div>
  );
};
