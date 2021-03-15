import React from 'react';


export const ResultCard = (props) => {
    if(props.character){
        return(
            <div>

            </div>
        )
    }else{

        return (
            <div>
                {/* {console.log(props)} */}
                <a href={`/manga/${props.mangaId}`}>
                    <img src={props.image} alt="pics" />
                    <h5>{props.title}</h5>
                </a>
            </div>
        )
    }
}