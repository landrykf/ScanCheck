import React from "react";



function DetailCard({manga}) {
    console.log(manga)
  return (
    <div>
        <p>{manga.synopsis}</p>
      {manga.image_url ? (
        <img src={`${manga.image_url}`} alt={`${manga.title} poster`} />
      ) : (
        <div className="filler-poster"></div>
      )}
    </div>
  );
}

export default DetailCard;
