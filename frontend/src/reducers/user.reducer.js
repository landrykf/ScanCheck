import { GET_USER, UPDATE_BIO, UPDATE_INFO } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    // console.log({action});
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
            username:action.payload,
            email:action.payload
        }

    default:
      return state;
  }
}
