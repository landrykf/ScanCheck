import axios from "axios";

export const GET_MANGAS = "GET_MANGAS";

//manga
export const getMangas = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/manga/`)
            .then((res) => {
                dispatch({type:GET_MANGAS, payload:res.data})
            })
            .catch((err) => console.log(err))
    }
}