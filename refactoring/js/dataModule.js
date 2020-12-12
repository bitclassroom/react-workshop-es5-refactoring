import Movie from './models/movie.js'

const data = {
    movies: [],
    totalMoviesLength: 0,
}

function calculateTotalLength() {
    let total = 0

    // Iterate trough movies and calculate length
    data.movies.forEach(function (currentMovie) {
        total += currentMovie.length
    })

    // Set our new total to our data object
    data.totalMoviesLength = total
}

// Functions to be exported to public
export function addMovie(title = 'unknown', length = '0', genre = 'unknown') {
    // const movie = new Movie(title, parseFloat(length), genre)
    const movie = new Movie({ title, genre, length })

    data.movies.push(movie)

    return movie
}

export function getTotalLength() {
    // calculate total data before returning
    calculateTotalLength()

    return data.totalMoviesLength
}
