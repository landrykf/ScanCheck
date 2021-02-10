import React from "react";
import {MangaControls} from './MangaControls';



export const MangaCard = ({manga, type}) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      {manga.image_url ? (
        <img src={`${manga.image_url}`} alt={`${manga.title} poster`} />
      ) : (
        <div className="filler-poster"></div>
      )}

      <MangaControls type={type} manga = {manga} />
    </div>
  );
};
