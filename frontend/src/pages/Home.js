import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/jikan/Header";
import Sidebar from "../components/jikan/Sidebar";
import HomeContent from "../components/jikan/HomeContent";
import { GridCard } from "../components/Mangalist/GridCard";

const Home = () => {
  const [mangaList, SetMangaList] = useState([]);
  const [topManga, SetTopManga] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopManga = async () => {
    let tops = await fetch(
      `https://api.jikan.moe/v3/top/manga/1/bypopularity`
    ).then((res) => res.json());
    SetTopManga(tops.top.slice(0, 5));
  };

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

  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div>
      <Header />
      <div className="content-wrap">

        <Sidebar topManga={topManga} />
        {console.log(topManga)}
        <GridCard title = {topManga.title} image ={topManga.image_url}  mangaId={topManga.mal_id}/>

        {/* {console.log(topManga)} */}

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

export default Home;
