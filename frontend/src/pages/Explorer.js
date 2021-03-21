import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Top from "../components/Categories/Top";
function Explorer() {
  const [topManga, SetTopManga] = useState([]);
  const [demons, setDemons] = useState([]);
  const [kids, setKids] = useState([]);
  const [music, setMusic] = useState([]);
  const [sport, setSport] = useState([]);

  const GetTopManga = async () => {
    let tops = await fetch(
      `https://api.jikan.moe/v3/genre/manga/3/1`
    ).then((res) => res.json());
    SetTopManga(tops.manga.slice(0, 5));

    let demonsGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/5/1`
    ).then((res) => res.json());
    setDemons(demonsGenre.manga.slice(0, 5));

    let kidsGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/15/1`
    ).then((res) => res.json());
    setKids(kidsGenre.manga.slice(0, 5));

    let musicGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/19/1`
    ).then((res) => res.json());
    setMusic(musicGenre.manga.slice(0, 5));

    let sportGenre = await fetch(
      `https://api.jikan.moe/v3/genre/manga/30/1`
    ).then((res) => res.json());
    setSport(sportGenre.manga.slice(0, 5));
  };

  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="movie-grid">
        <Top topManga={sport} />
        <Top topManga={music} />
        <Top topManga={kids} />
        <Top topManga={topManga} />
        <Top topManga={demons} />
      </div>
    </div>
  );
}

export default Explorer;
