import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const MangaControls = ({ manga, type }) => {
  const {
    removeMangaFromReadList,
    addMangaToReaded,
    moveToReadlist,
    removeFromReaded,
  } = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "readlist" && (
        <>
          <button className="ctrl-btn" onClick={() => addMangaToReaded(manga)}>
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
    </div>
  );
};
