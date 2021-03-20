import React from 'react';


export const GridCard = (props) => {
    // if(props.character){
    //     return(
    //         <div className="character">
    //             <img src={props.image} alt="pics" />

    //         </div>
    //     )
    // }else{

        return (
            <div className="grid-card">
            <div className="poster-wrapper">
              <a href={`/manga/${props.mangaId}`}>
                <img src={props.image} alt="pics" />
                <div className="info">
                  <div className="header">
                    <h5 className="title">{props.title}</h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )
    // }
}
