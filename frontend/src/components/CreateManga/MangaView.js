import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMangas } from '../../actions/manga.actions';
import { isEmpty } from '../Utils';
import {Card} from './Card'

export const MangaView = () => {
    const [loadManga, setLoadManga] = useState(true);
    const dispatch = useDispatch();
    const mangas = useSelector((state) => state.mangaReducer);

    useEffect(() => {
        if(loadManga) {
            dispatch(getMangas());
            setLoadManga(false)
        }
    }, [loadManga, dispatch])

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(mangas[0]) &&
                    mangas.map((manga) => {
                        return <Card manga={manga} key={manga._id} />
                    })
                }
            </ul>
        </div>
    )
}
