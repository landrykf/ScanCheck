import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Top from "../components/Categories/Top";
function Explorer() {
  const [topManga, SetTopManga] = useState([]);

  const GetTopManga = async () => {
    let tops = await fetch(
      //   `https://api.jikan.moe/v3/top/manga/1/bypopularity`
      `https://api.jikan.moe/v3/genre/manga/3/1`
    ).then((res) => res.json());
    // SetTopManga(tops.top.slice(0, 5));
    SetTopManga(tops.manga.slice(0, 5));

    console.log(tops);
  };

  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="movie-grid">
        <Top topManga={topManga} />
      </div>
    </div>
  );
}

export default Explorer;
