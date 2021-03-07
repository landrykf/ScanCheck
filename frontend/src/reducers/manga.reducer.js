import {
  EDIT_COMMENT,
  FAVE_MANGA,
  GET_MANGAS,
  UNFAVE_MANGA,
} from "../actions/manga.actions";

const initialState = {};

export default function mangaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANGAS:
      return action.payload;
    case FAVE_MANGA:
      return state.map((manga) => {
        if (manga._id === action.payload.mangaId) {
          return {
            ...manga,
            likers: [action.payload.userId, ...manga.likers],
          };
        }
        return manga;
      });
    case UNFAVE_MANGA:
      return state.map((manga) => {
        if (manga._id === action.payload.mangaId) {
          return {
            ...manga,
            likers: manga.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return manga;
      });

    //editer un commentaire dans un message
    case EDIT_COMMENT:
        //On selectionne le manga à editer
      return state.map((manga) => {
        if (manga._id === action.payload.mangaId) {
          return {
            ...manga,
        //On retrouve le commentaire
            comments: manga.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return manga;
        }
      });
    default:
      return state;
  }
}
