import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { MangaCard } from "./MangaCard";
export const Readlist = () => {
  const { readlist } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Ma Mangathèque</h1>
          <span className="count-pill">
            {readlist.length} {readlist.length === 1 ? "Manga" : "Mangas"}
          </span>
        </div>
        {readlist.length > 0 ? (
          <div className="movie-grid">
            {readlist.map((manga) => (
              <MangaCard manga={manga} type="readlist" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies"> Votre Mangathèque est vide </h2>
        )}
      </div>
    </div>
  );
};
