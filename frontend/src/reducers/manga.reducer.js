import { GET_MANGAS } from '../actions/manga.actions'

const initialState = {};

export default function mangaReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MANGAS: 
            return action.payload;
        default:
            return state;
    }
}