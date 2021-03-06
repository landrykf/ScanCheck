import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer'
import mangaReducer from './manga.reducer'

export default combineReducers({
    userReducer,
    usersReducer,
    mangaReducer,
})