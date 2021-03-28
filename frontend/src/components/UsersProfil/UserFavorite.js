import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GridCard } from '../Mangalist/GridCard';

export const UserFavorite = (props) => {
    const user = props.userId
    const [Loading, setLoading] = useState(true)
    const [FavoritedManga, setFavoritedManga] = useState([])
    let variables = {userFrom :user}

    
    useEffect(()=> {
        
        const fetchFavoritedManga = async () => {
    
           return axios.post('/api/user/getFavoritedManga', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setFavoritedManga(response.data.favorites)
                    setLoading(false)
                }else {
                    alert('Failed to get favorited')
                }
            })
            .catch((err) => console.log(err))
        };

        fetchFavoritedManga()
    });
    



    return (
        <div className="favorite">
   
        {FavoritedManga?.map((manga, index) => {
          return (
            <React.Fragment key={index}>

                <GridCard title = {manga.mangaTitle} image ={manga.mangaImage}  mangaId={manga.mangaId}/>

            </React.Fragment>
          );
        })}
      </div>
    )
}
