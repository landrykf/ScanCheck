import React from "react";
import SwiperCore, { Virtual, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Top({ topManga }) {
  return (
    <div>
      <aside>
        <div className="container">
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
          >
            {topManga.map((manga) => (
              <SwiperSlide key={manga.mal_id} className="top-card">
                <div className="top-card">
                  <img src={manga.image_url} alt="" />
                  <div>{manga.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </aside>
      )
    </div>
  );
}

export default Top;
