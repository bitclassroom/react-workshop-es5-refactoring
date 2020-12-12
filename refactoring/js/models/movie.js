class Movie {
    constructor(movieObj) {
        const { title = 'n/a', length, genre } = movieObj

        // this.title = movieObj.title
        this.title = title
        this.length = length
        this.genre = genre
    }

    getInfo() {
        return `${this.title}, duration: ${this.length}min, genre:
    ${this.getGenreAbbreviation(this.genre)}`
    }

    getGenreAbbreviation(genreStr = 'n/a') {
        // genreStr = genreStr || 'n/a'

        const firstIndex = 0
        const lastIndex = genreStr.length - 1
        const output = genreStr.charAt(firstIndex) + genreStr.charAt(lastIndex)
        return output.toUpperCase()
    }
}

export default Movie
