import React, { useEffect, useState } from 'react';
import { GridCard } from './sections/GridCard';
import { MainImage } from './sections/MainImage';


export const LandingPage = () => {
    const [Mangas, setMangas] = useState([]) 



    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/top/manga/1/bypopularity`)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setMangas(response.top)
            })
        
    },[])

    return (
        <div>
            {/* Manga main Image */}
            <MainImage image={Mangas[0]?.image_url} title={Mangas[0]?.title} />

            {/* grid card */}
            <div>
                {console.log(Mangas)}
                {Mangas?.map((manga, index) => {
                    return(

                    <div>                    
                    <React.Fragment key={index}>
                        <GridCard title={manga?.title} image ={manga?.image_url}  mangaId={manga.mal_id}/>
                    </React.Fragment>
                    </div>
                    )
                })}
            </div>
            
        </div>
    )
}
