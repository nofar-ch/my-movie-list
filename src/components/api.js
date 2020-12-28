const api = {
    apiKey: "544bf9d0cb6cf075dce22711b101aef1",
    baseUrl: "https://api.themoviedb.org/3/movie/"
}

export default {
    getPopularMovies: (url) => {
        return fetch(`${api.baseUrl}popular?api_key=${api.apiKey}&language=en-US&page=1`)
                .then(data => data.json())
                .then(data => data.results)
    },

    getMovieDetails: (id) => {
        return fetch(`${api.baseUrl}${id}?api_key=${api.apiKey}&language=en-US`)
                .then(data => data.json())
    },
    
    getMovieImage: (id) => {
        return fetch(`${api.baseUrl}${id}images?api_key=${api.apiKey}&language=en-US`)
                .then(data => data.json())
    }
}   