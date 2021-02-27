import React from 'react'
import MangaCard from '../jikan/MangaCard'

function HomeContent(props) {
    return (
        <main>
            <div className="main-head">
                <form 
                className="search-box"
                onSubmit = {props.HandleSearch}>
                    <input 
                        type= "search"
                        placeholder= "rechercher un manga"
                        required
                        value={props.search}
                        onChange={event => props.SetSearch(event.target.value)} 
                    />
                </form>
            </div>
            <div className="manga-list">
                {props.mangaList.map(manga => (
                    <MangaCard
                        manga = {manga}
                        key = {manga.mal_id}
                    />
                ))}
            </div>
        </main>
    )
}

export default HomeContent
