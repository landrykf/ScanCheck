import React from "react";
import SwiperCore, { Virtual, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Virtual, Navigation]);

function Sidebar({ topManga }) {


  return (
    <aside>
      <nav>
        <h3>Populaires</h3>

        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
        >
          {topManga.map((manga, index) => (
            <SwiperSlide key={manga.mal_id} virtualIndex={index}>
                <a href={`/manga/${manga.mal_id}`}>

                <img src={manga.image_url} alt="pics" />
                <li key={manga.mal_id} rel="noreferrer">
                  {manga.title}
                </li>
                </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>
    </aside>
  );
}

export default Sidebar;
