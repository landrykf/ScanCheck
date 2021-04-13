import React from "react";

function Top({ topManga }) {
  return (
    <div>
      <aside>
        <div className="container">
          {topManga.map((manga) => (
            <div key={manga.mal_id} className="top-card">
              <div className="top-card">
                <img src={manga.image_url} alt="" />
                <div>{manga.title}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      )
    </div>
  );
}

export default Top;
