import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Top from "../components/Categories/Top";
function Explorer() {
  const [Loading, setLoading] = useState(true);
  const [topManga, SetTopManga] = useState([]);
  const [demons, setDemons] = useState([]);
  const [kids, setKids] = useState([]);
  const [music, setMusic] = useState([]);
  const [sport, setSport] = useState([]);

  const GetTopManga = async () => {
    let tops = await fetch(
      `https://api.jikan.moe/v3/genre/manga/3/1`
    ).then((res) => res.json());
    SetTopManga(tops.manga.slice(0, 15));

    let demonsGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/5/1`
    ).then((res) => res.json());
    setDemons(demonsGenre.manga.slice(0, 15));

    let kidsGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/15/1`
    ).then((res) => res.json());
    setKids(kidsGenre.manga.slice(0, 15));

    let musicGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/19/1`
    ).then((res) => res.json());
    setMusic(musicGenre.manga.slice(0, 15));

    let sportGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/30/1`
    ).then((res) => res.json());
    setSport(sportGenre.manga.slice(0, 15));

    setLoading(false);
  };

  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div>
      <Navbar />

      {!Loading ? (
        <div className="cat-grid">
          <div className="cat-title">
            <i class="fas fa-skiing"></i>
            <h2>Sport</h2>
          </div>
          <Top topManga={sport} />
          <div className="cat-title">
            <i class="fas fa-guitar"></i>
            <h2>Music</h2>
          </div>
          <Top topManga={music} />
          <div className="cat-title">
            <i class="fas fa-child"></i>
            <h2>Kids</h2>
          </div>
          <Top topManga={kids} />
          <div className="cat-title">
            <i class="fas fa-fire-alt"></i>
            <h2>Top</h2>
          </div>
          <Top topManga={topManga} />
          <div className="cat-title">
            <i class="fas fa-sad-cry"></i>
            <h2>Horreur</h2>
          </div>
          <Top topManga={demons} />
        </div>
      ) : (
        <div>chargement ...</div>
      )}
    </div>
  );
}

export default Explorer;
