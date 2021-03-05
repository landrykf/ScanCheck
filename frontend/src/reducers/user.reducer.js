import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPDATE_INFO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  // console.log();
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    case UPDATE_INFO:
      return {
        ...state,
        username: action.payload,
        email: action.payload,
      };

    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow,
          // console.log(state.following)
        ),
      };

    default:
      return state;
  }
}
