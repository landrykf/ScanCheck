import React from "react";
import { useState, useEffect } from "react";

import HomeContent from "../components/jikan/HomeContent";
import Navbar from "../components/Navbar";
import MangaDetail from "../components/jikan/HomeContent";


const Watchlist = () => {
  const [mangaList, SetMangaList] = useState([]);
  const [search, SetSearch] = useState("");

  const [mangaDetail, SetMangaDetail] = useState([]);
  const [mangaId, SetMangaID] = useState("");

  const HandleSearch = (event) => {
    event.preventDefault();
    FetchManga(search);
  };

  const HandleDetail = (event) => {
    FetchMangaDetail(mangaId)
  };

  const FetchMangaDetail = async (id) => {
    let req = await fetch(
      `https://api.jikan.moe/v3/manga/${id}/`
      ).then((res) => res.json());

      SetMangaDetail(req.results)
  };

  const FetchManga = async (query) => {
    const searchReq = await fetch(
      `https://api.jikan.moe/v3/search/manga?q=${query}&order_by=title&sort=asc&limit=20`
    ).then((res) => res.json());

    SetMangaList(searchReq.results);
  };

  return (
    <div className="watchlist-page">
      <div>
        <div>
          <Navbar />
          <h2>UPDATE PAGE</h2>
        </div>
        <HomeContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          mangaList={mangaList}
        />
        {/* <MangaDetail
          HandleDetail = {HandleDetail}
          mangaId = {mangaId}
          SetMangaID = {SetMangaID}
          mangaDetail= {mangaDetail}
        /> */}

      </div>
    </div>
  );
};

export default Watchlist;
