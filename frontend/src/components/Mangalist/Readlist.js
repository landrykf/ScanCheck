import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Detail from "../Details/Detail";
import { MangaCard } from "./MangaCard";

export const Readlist = () => {
  const { readlist } = useContext(GlobalContext);
  const { showDetail } = useContext(GlobalContext);
  //affichage popup
  const [detailPopup, setDetailPopup] = useState(false);


  // console.log({showDetail});
  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Ma Mangathèque</h1>
          <span className="count-pill">
            {readlist.length} {readlist.length === 1 ? "Manga" : "Mangas"}
          </span>
        </div>
        {readlist.length > 0 ? (
          <div className="movie-grid">
            {readlist.map((manga) => (
              <MangaCard manga={manga} type="readlist" key={manga.mal_id}/>
            ))}
          </div>
        ) : (
          <h2 className="no-movies"> Votre Mangathèque est vide </h2>
        )}
      </div>
      <div>
        {/* {console.log(showDetail)} */}
        {/* {showDetail.length > 0 ? (
          <div>
            {(<div>
              {showDetail.map((manga) => (
                <Detail manga ={manga} type="showDetail" />
              ))}
            </div>)} 
          </div>
        ):(<h1>pas de carte</h1>)} */}

        {/* <div>
          <Detail detailPopup={detailPopup} manga={showDetail} type="showDetail" />
        </div> */}
      </div>
    </div>
  );
};
