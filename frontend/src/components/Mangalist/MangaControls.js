import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Detail from "../Details/Detail";

export const MangaControls = ({manga, type }) => {


  // const [detailPopup, setDetailPopup] = useState(false);


  const {
    removeMangaFromReadList,
    addMangaToReaded,
    moveToReadlist,
    removeFromReaded,
    showMangaDetail,
  } = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "readlist" && (
        <>
          <button className="ctrl-btn" onClick={() => addMangaToReaded(manga) }>
            <i className="fas fa-book-open"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMangaFromReadList(manga.mal_id)}
          >
            <i className="fas fa-times"></i>
          </button>

        </>
      )}

      {type === "readed" && (
        <>
          <button className="ctrl-btn" onClick={() => moveToReadlist(manga)}>
            <i className="fas fa-book"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeFromReaded(manga.mal_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </>
      )}

      {/* {detailPopup && 
      <div className="popup-profil-container">
        <div className="modal">
          <h3>bannière</h3>
        <Detail/>
        </div>
      </div> } */}
      
    </div>
  );
};
