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
                <h1>card</h1>
                {/* {console.log(props)} */}
                <a href={`/manga/${props.mangaId}`}>
                    <img src={props.image} alt="pics" />
                </a>
            </div>
        )
    }
}
