import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GridCard } from '../GridCard';

export const MyFavorite = () => {
    const userData = useSelector((state) => state?.userReducer);
    const [Loading, setLoading] = useState(true)
    const [FavoritedManga, setFavoritedManga] = useState([])
    let variables = {userFrom : userData?._id}

    
    useEffect(()=> {
        
        const fetchFavoritedManga = async () => {
    
           return axios.post('/api/user/getFavoritedManga', variables)
            .then(response => {
                if(response.data.success){
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
