import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { MangaCard } from "./MangaCard";

export const Readed = () => {
  const { readed } = useContext(GlobalContext);
  // console.log(readed);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Mes manga lu</h1>
          <span className="count-pill">
            {readed.length} {readed.length === 1 ? "Manga" : "Mangas"}
          </span>
        </div>
        {readed.length > 0 ? (
          <div className="movie-grid">
            {readed.map((manga) => (
              <MangaCard manga={manga} type="readed" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">
            Vous n'avez pas encore ajouté de manga lu
          </h2>
        )}
      </div>
    </div>
  );
};
