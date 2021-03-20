import React from "react";

function Sidebar({ topManga }) {
  return (
    <aside>
      <nav>
        <h3>Populaires</h3>
        {topManga.map((manga) => (
          <div key={manga.mal_id}>
            <img src={manga.image_url} alt="pics" />
            <li key={manga.mal_id} rel="noreferrer">
              {manga.title}
            </li>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
