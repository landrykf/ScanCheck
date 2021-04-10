import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../context/GlobalState";
import { MangaCard } from "./MangaCard";

export const Readed = () => {
  const userData = useSelector((state) => state?.userReducer);
  const [Loading, setLoading] = useState(true);
  const [readed, setReaded] = useState([]);

  let variables = { userId: userData?._id };

  useEffect(() => {
    const fetchMangaReaded = async () => {
      return axios
        .post("/api/manga/getreads", variables)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setReaded(response.data.reads);
            setLoading(false);
          } else {
            alert("Failed to get readed");
          }
        })
        .catch((err) => console.log(err));
    };

    fetchMangaReaded();
  });
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
              <MangaCard manga={manga} type="readed" key={manga.mal_id} />
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
