import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/jikan/Header";
import Sidebar from "../components/jikan/Sidebar";

const Home = () => {
  const [topManga, SetTopManga] = useState([]);
  const GetTopManga = async () => {
    let tops = await fetch(
      `https://api.jikan.moe/v3/top/manga/1/bypopularity`
    ).then((res) => res.json());
    SetTopManga(tops.top.slice(0, 5));
  };



  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div>
      <Header />
      <div className="content-wrap">

        <Sidebar topManga={topManga} />
        {console.log(topManga)}

      </div>
    </div>
  );
};

export default Home;
