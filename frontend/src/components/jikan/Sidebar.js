import React from 'react'

function Sidebar({ topManga }) {
    return (
        
            <aside>
                <nav>
                    <h3>Populaires</h3>
                    {topManga.map(manga => (

                    <a 
                        href='#'
                        key = {manga.mal_id}
                        rel="noreferrer">
                        
                        {manga.title}
                    </a>

                    ))}

                </nav>
            </aside>
        
    )
}

export default Sidebar
