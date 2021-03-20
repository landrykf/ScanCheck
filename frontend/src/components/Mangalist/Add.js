import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [mangas, setManga] = useState([]);

  const onChange = (event) => {
    event.preventDefault();

    console.log(event.target.value);

    setQuery(event.target.value);

    if (event.target.value.length > 3 && event.target.value !== "") {
      fetch(
        `https://api.jikan.moe/v3/search/manga?q=${query}&order_by=title&sort=asc&limit=20`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setManga(data.results);
            // console.log(data.results)
          } else {
            setManga([]);
          }
        });
    } else {
      setManga([]);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              id="search"
              type="search"
              placeholder="Rechercher un manga"
              value={query}
              onChange={onChange}
            />
          </div>

          {mangas?.length > 0 && (
            <ul className="results">
              {mangas.map((manga) => (
                <li key={manga.mal_id}>
                  <ResultCard
                    title={manga?.title}
                    image={manga?.image_url}
                    mangaId={manga.mal_id}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
