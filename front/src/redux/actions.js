import axios from 'axios'

export const addFavorite = (character) => {
    /* return {
        type: "ADD_FAVORITE",
        payload: character,
    } */
    //dai:

    return async (dispatch) => {
        const response = await axios.post("http://localhost:3001/rickandmorty/fav", character)
        const data = response.data
        return dispatch({
            type: "ADD_FAVORITE",
            payload: character, //ojo que no sea DATA, data es el mensaje del res del controlador
        })
    }

}

export const deleteCharacter = (id) => {
    /*   return {
          type: "DELETE_CHARACTER",
          payload: id,
      } */
    //dai:

    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:3001/rickandmorty/fav/${id}`)
        const data = response.data
        return dispatch({
            type: "DELETE_CHARACTER",
            payload: id, //data?? o id
        })
    }
}

export const filterCards = (status) => { //gender?
    return {
        type: "FILTER",
        payload: status //payload: genero?
    }
}

export const orderCards = (id) => {
    return {
        type: "ORDER",
        payload: id
    }
}

export const resetCharacters = () => {
    return {
        type: "RESET_CHARACTERS"
    }
}