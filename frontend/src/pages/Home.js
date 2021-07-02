import React from "react";
import { useState, useEffect } from "react";
import { Computer } from "../components/Home/Computer";
import Header from "../components/jikan/Header";
import Sidebar from "../components/jikan/Sidebar";

const Home = () => {
  const [Loading, setLoading] = useState(true);
  const [topManga, SetTopManga] = useState([]);

  const GetTopManga = async () => {
    let tops = await fetch(
      `https://api.jikan.moe/v3/top/manga/1/bypopularity`
    ).then((res) => res.json());
    SetTopManga(tops.top.slice(0, 20));
    setLoading(false);
  };

  useEffect(() => {
    GetTopManga();
  }, []);

  return (
    <div id="home">
      <Header />
      <header>
        <Computer />
      </header>
      {!Loading ? (
        <div>
          <div className="content-wrap">
            <Sidebar topManga={topManga} />
          </div>
        </div>
      ) : (
        <div>Chargement...</div>
      )}
    </div>
  );
};

export default Home;
