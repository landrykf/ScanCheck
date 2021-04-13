import React from 'react'

export const MainImage = (props) => {
    return (
        <div className="banner">
            <p>{props.title}</p>
            <img src={props.image} alt="pics" />
        </div>
    ) 
}
