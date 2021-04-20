import React from 'react';


export const GridCard = (props) => {
    if(props.character){
        return(
            <div>

            </div>
        )
    }else{

        return (
            <div>
                <a href={`/manga/${props.mangaId}`}>
                    <img src={props.image} alt="pics" />
                    <h5>{props.title}</h5>
                </a>
            </div>
        )
    }
}
