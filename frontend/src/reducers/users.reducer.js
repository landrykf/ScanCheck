import { GET_USERS } from "../actions/users.actions"

const initialState = {};

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        case GET_USERS:
          console.log(action.payload);
          return action.payload;
        default:
          return state;
      }
}