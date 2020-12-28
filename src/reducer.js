const mainReducer = (state = {favoriteList: []}, action) => {
    switch(action.type) {
        case 'ADD':
            console.log(action.movie)
            const addFav = state.favoriteList;
            addFav.push(action.movie);
            return {favoriteList: addFav}
        case 'REMOVE':
            const reFav = state.favoriteList.filter(m => m.movie.id !== action.id)
             return {favoriteList: reFav}

        default:
            return state;
    }
}
export default mainReducer;