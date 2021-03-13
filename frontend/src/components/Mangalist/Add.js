import React, { useState } from "react";
import {ResultCard} from './ResultCard';

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([])

  const onChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);

    fetch(
      `https://api.jikan.moe/v3/search/manga?q=${query}&order_by=title&sort=asc&limit=20`
    )
    .then((res)=>res.json())
    .then((data)=>{
        if(!data.errors){
            setResults(data.results)
            // console.log(data.results)
        }else {
            setResults([]);
        }
    })

  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="search"
              placeholder="Rechercher un manga"
              value={query}
              onChange={onChange}
            />
          </div>

          {results?.length > 0 && (
              <ul className="results">
                  {results.map((manga) => (
                      <li key={manga.mal_id}>
                          <ResultCard manga={manga}/>
                      </li>
                  ))}
              </ul>
          )}
        </div>
      </div>
    </div>
  );
};
