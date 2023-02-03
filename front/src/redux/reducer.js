const initialState = {
    myFavorites: [],
    allCharacters: [],
    allFavs: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            //dai:
            /*  return {
                 ...state,
                 myFavorites: [...state.allCharacters, action.payload],
                 allCharacters: [...state.myFavorites, action.payload]
             } */
            // dani:
            return {
                ...state,
                myFavorites: [...state.myFavorites, action.payload],
                allCharacters: [...state.allCharacters, action.payload]

            }
        case "DELETE_CHARACTER":
            return {
                ...state,
                myFavorites: state.myFavorites.filter(character =>
                    character.id !== action.payload
                ),
            }
        case "FILTER":
            /*  //dai:
             const allCharsFiltered = state.allCharacters.filter(char => char.gender === action.payload)
             return {
                 ...state,
                 myFavorites: allCharsFiltered
             } */
            //dani:
            return {
                ...state,
                allCharacters: [...state.allCharacters],
                myFavorites: state.allCharacters.filter(character =>
                    character.gender === action.payload),
            }
        case "ORDER":
            /*  
            return {
                ...state,
                myFavorites:
                action.payload === "Ascendente"
                ? state.allCharacters.sort((a,b)=>a.id<b.id)
                : state.allCharacters.sort((a,b)=>a.id>b.id)
            }
            */
            return {
                ...state,
                allCharacters: [...state.myFavorites],
                myFavorites: state.allCharacters.sort((a, b) => {
                    if (a.id > b.id) return "Ascendente" === action.payload ? 1 : -1
                    if (a.id < b.id) return "Descendente" === action.payload ? 1 : -1
                    return 0
                })
            }
        case "RESET_CHARACTERS":
            return {
                ...state,
                myFavorites: [...state.allCharacters],
                allCharacters: [...state.allCharacters] //no esta super ok aun... (antes decia ...state.myFavorites)
            }
        default:
            return { ...state }
    }
};

export default reducer