import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Favorite } from "./sections/Favorite";
import { GridCard } from "./sections/GridCard";
import { MainImage } from "./sections/MainImage";

export const MangaDetailPage = (props) => {
  // console.log(props);
  const [Manga, setManga] = useState([]);
  const [crews, setCrews] = useState([]);
  const mangaId = props.match.params.mangaId;
  const userData = useSelector((state) => state.userReducer);
  //   console.log(userData);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/manga/${mangaId}`)
      .then((response) => response.json())
      .then((response) => setManga(response));

    fetch(`https://api.jikan.moe/v3/manga/${mangaId}/characters`)
      .then((response) => response.json())
      .then((response) => setCrews(response.characters));
  }, []);

  return (
    <div>
      {/* Favorite */}

      <Favorite
        userFrom={userData._id}
        mangaId={mangaId}
        mangaTitle={Manga.title}
        mangaImage={Manga.image_url}
      />

      {/* Main Image */}
      <MainImage image={Manga?.image_url} title={Manga?.title} />

      {/* Manga Info */}
      <div>
        {/* {console.log(Manga)} */}
        {/* <h5>{Manga?.authors[0]?.name}</h5> */}
        <div>{Manga?.status}</div>
        {Manga?.synopsis}
      </div>
      {/* Grid card for caracters */}

      <div>
        {crews?.map((crew, index) => {
          return (
            <div key={crew.mal_id}>
              <React.Fragment key={index}>
                <GridCard characters image={crew?.image_url} />
              </React.Fragment>
            </div>
          );
        })}
      </div>
    </div>
  );
};
