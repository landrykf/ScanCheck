import React, { useEffect, useState } from 'react';
import { Read } from '../Readed/Read';


export const ReadCard = (props) => {
    // if(props.character){
    //     return(
    //         <div className="character">
    //             <img src={props.image} alt="pics" />

    //         </div>
    //     )
    // }else{
  const [manga, SetManga] = useState([]);


      const GetManga = async () => {
        let manga = await fetch(
          `https://api.jikan.moe/v3/manga/${props.mangaId}`
        ).then((res) => res.json());
        SetManga(manga)
      };
      console.log(manga);

      useEffect(() => {
        GetManga();
      }, []);

        return (
            <div className="grid-card">
            <div className="poster-wrapper">
              <Read/>
              <a href={`/manga/${manga.mal_id}`}>
                <img src={manga.image_url} alt="pics" />
                <div className="info">
                  <div className="header">
                    <h5 className="title">{manga.title}</h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )
    // }
}
