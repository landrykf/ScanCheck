import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar";
import { Favorite } from "../favorite/Favorite";
import { GridCard } from "../GridCard";
import { MainImage } from "../MainImage";

import SwiperCore, { Virtual, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { CrewsCard } from "./CrewsCard";

SwiperCore.use([Virtual, Navigation]);

export const MangaDetailPage = (props) => {
  console.log(props);
  const [Manga, setManga] = useState([]);
  const [crews, setCrews] = useState([]);
  const [Loading, setLoading] = useState(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [mangaId]);

  return (
    <div>
      <Navbar />
      <div class="detail-container">
        <MainImage image={Manga?.image_url} title={Manga?.title} />
        {!Loading ? (
          <div>
            <Favorite
              userFrom={userData._id}
              mangaId={mangaId}
              mangaTitle={Manga.title}
              mangaImage={Manga.image_url}
            />

            <div className="info">
              {/* <h5>{Manga?.authors[0]?.name}</h5> */}
              <div>{Manga?.status}</div>
              {Manga?.synopsis}
            </div>

            <h2>Personnages favoris</h2>

            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="crew-case"
            >
              {crews?.map((crew, index) => {
                return (
                  <SwiperSlide key={crew.mal_id}>
                    <React.Fragment key={index}>
                      <CrewsCard
                        characters
                        image={crew?.image_url}
                        name={crew.name}
                      />
                    </React.Fragment>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div>Chargement...</div>
        )}
      </div>
    </div>
  );
};
