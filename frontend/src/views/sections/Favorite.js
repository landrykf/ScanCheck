import axios from "axios";
import React, { useEffect, useState } from "react";

export const Favorite = (props) => {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variable = {
    userFrom: props.userFrom,
    mangaId: props.mangaId,
    mangaTitle: props.mangaTitle,
    mangaImage: props.mangaImage,
  };

  useEffect(() => {
    axios.post("/api/user/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.suscribeNumber);
        console.log(response.data);
      } else {
        alert("failed to get favoriteNumber");
      }
    });

    axios.post("/api/user/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Failed to get Favorite");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      //Ajouté
      axios.post("/api/user/removeFromFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Faied to add to remove from favorite");
        }
      });
    } else {
      //Pas encore ajouté
      axios.post("/api/user/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to add to Favorite");
        }
      });
    }
  };

  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? "remove From Favorite" : "Add to Favorite"}
      </button>
      <h5> nombre de fav {FavoriteNumber}</h5>
    </div>
  );
};
