import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../context/GlobalState";
import { ReadCard } from "../Readed/ReadCard";
import { MangaCard } from "./MangaCard";

export const Readed = () => {
  const userData = useSelector((state) => state?.userReducer);
  const [Loading, setLoading] = useState(true);
  const [readed, setReaded] = useState([]);

  let variables = { userId: userData?._id };

  useEffect(() => {
    const fetchMangaReaded = async () => {
      return axios
        .post("/api/manga/getReadedManga", variables)
        .then((response) => {
          if (response.data.success) {
            setReaded(response.data.readed);

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
    <div className="read-page">
      <h1 className="heading">Mes manga lu</h1>
      {readed.length} {readed.length === 1 ? "Manga" : "Mangas"}
      <div className="container">
        {/* <div className="header">
          <span className="count-pill"></span>
        </div> */}
        {readed.length > 0 ? (
          <>
            {readed.map((manga) => (
              <ReadCard mangaId={manga.mangaId} />
            ))}
          </>
        ) : (
          <h2 className="no-movies">
            Vous n'avez pas encore ajouté de manga lu
          </h2>
        )}
      </div>
    </div>
  );
};
