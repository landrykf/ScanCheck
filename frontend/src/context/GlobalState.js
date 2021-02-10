import { createContext } from "react";
import React, { useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
//initial state

const initialState = {
  readlist: localStorage.getItem("readlist")
    ? JSON.parse(localStorage.getItem("readlist"))
    : [],
  readed: localStorage.getItem("readed")
    ? JSON.parse(localStorage.getItem("readed"))
    : [],
  showDetail: [],
};

//create contect

export const GlobalContext = createContext(initialState);

//provider components

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("readlist", JSON.stringify(state.readlist));
    localStorage.setItem("readed", JSON.stringify(state.readed));
  }, [state]);

  // Actions
  const addMangaToReadList = (manga) => {
    dispatch({ type: "ADD_MANGA_TO_READLIST", payload: manga });
  };

  const showMangaDetail = (manga) => {
    dispatch ({type: "SHOW_MANGA_DETAIL", payload: manga})
  }

  const removeMangaFromReadList = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMangaToReaded = (manga) => {
    dispatch({ type: "ADD_MANGA_TO_READED", payload: manga });
  };

  //Deplacer dans la readlist

  const moveToReadlist = (manga) => {
    dispatch ({type: 'MOVE_TO_READLIST', payload: manga})
  } 

  //Supprimer des manga lu

  const removeFromReaded = (id) => (
    dispatch({ type: 'REMOVE_FROM_WATCHED', payload: id })
  )

  return (
    <GlobalContext.Provider
      value={{
        readlist: state.readlist,
        readed: state.readed,
        showDetail: state.showDetail,
        addMangaToReadList,
        removeMangaFromReadList,
        addMangaToReaded,
        moveToReadlist,
        removeFromReaded,
        showMangaDetail,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
