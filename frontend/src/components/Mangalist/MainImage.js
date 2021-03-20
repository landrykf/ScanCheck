import React from 'react'

export const MainImage = (props) => {
    return (
        <div className="banner">
            <img src={props.image} alt="pics" />
            <p>{props.title}</p>
        </div>
    ) 
}
