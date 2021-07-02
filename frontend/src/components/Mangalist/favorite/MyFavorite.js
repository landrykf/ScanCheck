import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GridCard } from "../GridCard";

export const MyFavorite = (props) => {
  const userData = useSelector((state) => state?.userReducer);
  const [Loading, setLoading] = useState(true);
  const [FavoritedManga, setFavoritedManga] = useState([]);
  let variables = { userFrom: userData?._id };

  useEffect(() => {
    const fetchFavoritedManga = async () => {
      return axios
        .post("/api/user/getFavoritedManga", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoritedManga(response.data.favorites);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          } else {
            alert("Failed to get favorited");
          }
        })
        .catch((err) => console.log(err));
    };

    fetchFavoritedManga();
  });

  return (
    <div className="favorite">
      {FavoritedManga?.map((manga, index) => {
        return (
          <>
            {!Loading ? (
              <React.Fragment key={index}>
                <GridCard
                  type={props.type}
                  title={manga.mangaTitle}
                  image={manga.mangaImage}
                  mangaId={manga.mangaId}
                />
              </React.Fragment>
            ) : (
              <div className="loading-card">
                <i class="fas fa-circle-notch"></i>
                chargement ...
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
