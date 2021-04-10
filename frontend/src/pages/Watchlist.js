import React from "react";
// import { useState, useEffect } from "react";

// import HomeContent from "../components/jikan/HomeContent";
import Navbar from "../components/Navbar";

//part 2

// import { Header } from "../components/Mangalist/Header";
import { Readlist } from "../components/Mangalist/Readlist";
import { Readed } from "../components/Mangalist/Readed";
import { Add } from "../components/Mangalist/Add";
import { ProfilBody } from "../components/Profil/ProfilBody";
import { MyFavorite } from "../components/Mangalist/favorite/MyFavorite";

const Watchlist = () => {
  // const [mangaList, SetMangaList] = useState([]);
  // const [search, SetSearch] = useState("");

  // const HandleSearch = (event) => {
  //   event.preventDefault();
  //   FetchManga(search);
  // };

  // const FetchManga = async (query) => {
  //   const searchReq = await fetch(
  //     `https://api.jikan.moe/v3/search/manga?q=${query}&order_by=title&sort=asc&limit=20`
  //   ).then((res) => res.json());

  //   SetMangaList(searchReq.results);
  // };

  return (
    <div className="watchlist-page">
      <div>
        <div>
          <Navbar />
        </div>
        <Add />
        {/* <Header /> */}
        {/* <Readlist /> */}
        <MyFavorite type="readlist" />
        <Readed />

        {/* <HomeContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          mangaList={mangaList}
        /> */}
      </div>
    </div>
  );
};

export default Watchlist;
