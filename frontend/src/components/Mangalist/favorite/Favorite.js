import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Favorite = (props) => {
  const userData = useSelector((state) => state.userReducer);

  const userFrom = props.userFrom;
  const mangaId = props.mangaId;
  const mangaTitle = props.mangaTitle;
  const mangaImage = props.mangaImage;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variable = {
    userFrom: props.userFrom,
    mangaId: mangaId,
    mangaTitle: mangaTitle,
    mangaImage: mangaImage,
  };
  // console.log(variable);
  const onClickFavorite = () => {
    if (Favorited) {
      //Ajouté
      axios.post("/api/user/removeFromFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to remove from favorite");
        }
      });
    } else {
      //Pas encore ajouté
      axios.post("/api/user/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          //   console.log(response.data);
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to add to Favorite");
        }
      });
    }
  };

  useEffect(() => {
    axios.post("/api/user/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.suscribeNumber);
        // console.log(response.data);
      } else {
        alert("failed to get favoriteNumber");
      }
    });

    axios.post("/api/user/favorited", variable).then((response) => {
      if (response.data.success) {
        // console.log(response);
        setFavorited(!response.data.suscribed);
      } else {
        alert("Failed to get Favorite");
      }
    });
  }, [variable, Favorited]);

  return (
    <div className="fav-button">
      <button onClick={onClickFavorite}>
        {!Favorited ? "Ajouter aux Favoris" : "Supprimer des Favoris"}
      </button>
      <h5> nombre de fav {FavoriteNumber}</h5>
    </div>
  );
};
