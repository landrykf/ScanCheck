export default (state, action) => {
  switch (action.type) {
    case "ADD_MANGA_TO_READLIST":
      return {
        ...state,
        readlist: [action.payload, ...state.readlist],
      };

      case "SHOW_MANGA_DETAIL":
        return{
          ...state,
          showDetail : action.payload,
        }

    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        readlist: state.readlist.filter(
          (manga) => manga.mal_id !== action.payload
        ),
      };

    case "ADD_MANGA_TO_READED":
      return {
        ...state,
        readlist: state.readlist.filter(
          (manga) => manga.mal_id !== action.payload.mal_id
        ),
        readed: [action.payload, ...state.readed],
      };

    case "MOVE_TO_READLIST":
      return {
        ...state,
        readed: state.readed.filter(
          (manga) => manga.mal_id !== action.payload.mal_id,
          ),
          readlist : [action.payload, ...state.readlist]
      };

      case "REMOVE_FROM_WATCHED":
          return{
              ...state,
              readed: state.readed.filter(
                  (manga) => manga.mal_id !== action.payload
              )
          }

    default:
      return state;
  }
};
