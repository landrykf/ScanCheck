import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const ResultCard = ({ manga }) => {
  const { addMangaToReadList, addMangaToReaded, readlist, readed } = useContext(
    GlobalContext
  );
  // console.log({ readlist });

  let storedManga = readlist.find((o) => o.mal_id === manga.mal_id);
  let storedMangaReaded = readed.find((o) => o.mal_id === manga.mal_id);

  const readListDisable = storedManga ? true : storedMangaReaded ? true : false;

  const readedDisable = storedMangaReaded ? true : false

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {manga.image_url ? (
          <img src={`${manga.image_url}`} alt={`${manga.title} poster`} />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{manga.title}</h3>
          <h4 className="release-date">
            {manga.start_date ? manga.start_date.substring(0, 4) : "-"}
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn"
            disabled={readListDisable}
            onClick={() => addMangaToReadList(manga)}          
          >
            Ajouter à ma Mangathèque
          </button>

          <button
            className="btn"
            disabled={readedDisable}
            onClick={() => addMangaToReaded(manga)}
          >
            lu ?
          </button>
        </div>
      </div>
    </div>
  );
};
