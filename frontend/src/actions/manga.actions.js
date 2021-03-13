import axios from "axios";

export const GET_MANGAS = "GET_MANGAS";
export const FAVE_MANGA = "FAVE_MANGA";
export const UNFAVE_MANGA = "UNFAVE_MANGA";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT"

//manga
export const getMangas = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/manga/`)
            .then((res) => {
                // console.log(res);
                dispatch({type:GET_MANGAS, payload:res.data})
            })
            .catch((err) => console.log(err))
    }
}

//like

export const faveManga = (mangaId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/manga/like-manga/` + mangaId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({type: FAVE_MANGA, payload: {mangaId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const unFaveManga = (mangaId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/manga/unlike-manga/` + mangaId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({type: UNFAVE_MANGA, payload: {mangaId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

//comments
export const addComment = (mangaId, commenterId, text, commenterUsername) => {
    return (dispatch) => {

        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/manga/manga-comment/${mangaId}`,
            data: { commenterId, text, commenterUsername}
        })
        .then((res) => {
            dispatch({type: ADD_COMMENT, payload: {mangaId}})
        })
        .catch((err) => console.log(err))

    }
}

export const editComment = (mangaId, commentId, text) => {
    return (dispatch) => {

        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/manga/edit-manga-comment/${mangaId}`,
            data: { commentId, text}
        })
        .then((res) => {
            dispatch({type: EDIT_COMMENT, payload: {mangaId, commentId, text}})
        })
        .catch((err) => console.log(err))

    }
} 