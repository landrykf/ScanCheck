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
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
            {console.log(topManga)}
          {topManga.map((manga, index) => (
            <SwiperSlide key={manga.mal_id} virtualIndex={index}>
              <div className="swipe">
                <img src={manga.image_url} alt="pics" />
                <li key={manga.mal_id} rel="noreferrer">
                  {manga.title}
                </li>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>
    </aside>
  );
}

export default Sidebar;
