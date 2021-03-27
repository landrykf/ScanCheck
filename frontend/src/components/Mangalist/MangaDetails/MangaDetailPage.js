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
import { Comments } from "../../Comments/Comments";
import axios from "axios";

SwiperCore.use([Virtual, Navigation]);

export const MangaDetailPage = (props) => {
  const [Manga, setManga] = useState([]);
  const [crews, setCrews] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const mangaId = props.match.params.mangaId;
  const userData = useSelector((state) => state.userReducer);

  const mangaVariable = {
    mangaId: mangaId,
  };

  useEffect(() => {
    axios.post("/api/manga/get-comments", mangaVariable).then((response) => {
      console.log(response);
      if (response.data.success) {
        // console.log("response.data.comments", response.data.comments);
        setCommentList(response.data.comments);
      } else {
        console.log("Failed to get comments Info");
      }
    });
  }, []);

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

  const updateComment = (newComment) => {
    setCommentList(commentList.concat(newComment));
    // console.log(commentList);
  };

  return (
    <div>
      <Navbar />
      <div className="detail-container">
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
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log("slide change")}
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

        <Comments
          commentList={commentList}
          mangaId={mangaId}
          mangaTitle={Manga.title}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
};
