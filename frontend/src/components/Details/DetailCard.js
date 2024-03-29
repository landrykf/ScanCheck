import React from "react";

function DetailCard({ manga }) {
  console.log(manga);

  return (
    <div className="modal">
      <span className="cross">&#10005;</span>

      <div className="detail-banner">
        <img src={`${manga.image_url}`} alt={`${manga.title} poster`} />
      </div>
      <div className="info-zone">
        <h3>{manga.title}</h3>
        <h4>{manga.score}/10</h4>
      </div>
      <div className="detail-text">
        <p>{manga.synopsis}</p>
      </div>
    </div>
  );
}

export default DetailCard;
