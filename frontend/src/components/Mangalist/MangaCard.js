import React, { useState, useContext } from "react";
import { MangaControls } from "./MangaControls";
import { GlobalContext } from "../../context/GlobalState";
import Detail from "../Details/Detail";

export const MangaCard = ({ manga, type }) => {
  const { showMangaDetail } = useContext(GlobalContext);
  const [detailPopup, setDetailPopup] = useState(false);


  return (
    <div>
      
      <div
        className="movie-card"
        onClick={() => {
          showMangaDetail(manga);
          setDetailPopup(true);
        }}
      >
        <div className="overlay"></div>

        {manga.image_url ? (
          <img src={`${manga.image_url}`} alt={`${manga.title} poster`} />
        ) : (
          <div className="filler-poster"></div>
        )}

        <MangaControls type={type} manga={manga} />
      </div>
      {detailPopup && (       
          <Detail detailPopup={detailPopup}/> 
      )}
    </div>
  );
};
