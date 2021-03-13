import React from 'react'

export const MainImage = (props) => {
    return (
        <div>
            <img src={props.image} alt="pics" />
            <p>{props.title}</p>
        </div>
    ) 
}
