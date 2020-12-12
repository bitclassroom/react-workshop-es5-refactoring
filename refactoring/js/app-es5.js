const dataController = (function () {
    const data = {
        movies: [],
        totalMoviesLength: 0,
    }

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
        ${getGenreAbbreviation(this.genre)}`
        }
    }

    function myFunc() {
        console.log('arguments', arguments)
    }

    myFunc(0, 32, 234, 234, 3242)

    // // Movie constructor
    // function Movie(title, length, genre) {
    //     this.title = title
    //     this.length = length
    //     this.genre = genre
    // }

    // Movie.prototype.getInfo = function () {
    //     return `${this.title}, duration: ${this.length}min, genre:
    //     ${getGenreAbbreviation(this.genre)}`
    // }

    // Private functions used within this module
    // Not exposed to the public
    function getGenreAbbreviation(genreStr = 'n/a') {
        // genreStr = genreStr || 'n/a'

        const firstIndex = 0
        const lastIndex = genreStr.length - 1
        const output = genreStr.charAt(firstIndex) + genreStr.charAt(lastIndex)
        return output.toUpperCase()
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
    function addMovie(title = 'unknown', length = '0', genre = 'unknown') {
        // const movie = new Movie(title, parseFloat(length), genre)
        const movie = new Movie({ title, genre, length })

        data.movies.push(movie)

        return movie
    }

    function getTotalLength() {
        // calculate total data before returning
        calculateTotalLength()

        return data.totalMoviesLength
    }

    // This is only for TEST
    function logData() {
        console.log(data)
    }

    return {
        addMovie,
        getTotalLength,
        // ONLY FOR TEST
        log: logData,
    }
})()

const UIController = (function () {
    const DOMStrings = {
        inputTitle: '.movie-title',
        inputLength: '.movie-length',
        selectGenre: '.genre-select',
        containerMovieList: '.movie-list ul',
        containerError: '.movie-error',
        buttonAddMovie: '.create-movie',
        formElement: 'form',
        containerTotalLength: '.total-length span',
    }

    function collectInput() {
        const titleElement = document.querySelector(DOMStrings.inputTitle)
        const lengthElement = document.querySelector(DOMStrings.inputLength)
        const genreSelectElement = document.querySelector(DOMStrings.selectGenre)
        const genreOptionElement =
            genreSelectElement.options[genreSelectElement.selectedIndex]

        const result = {
            title: titleElement.value,
            length: lengthElement.value,
            genre: genreOptionElement.value,
        }

        return result
    }

    function displayListItem(movie) {
        const listEl = document.querySelector(DOMStrings.containerMovieList)

        const htmlItem = '<li>' + movie.getInfo()
        ;+'</li>'

        listEl.insertAdjacentHTML('beforeend', htmlItem)
    }

    function clearFormInputs() {
        // Reset forma data
        document.querySelector(DOMStrings.formElement).reset()

        // Reset error if any
        document.querySelector(DOMStrings.containerError).textContent = ''

        // Set focus to title input
        document.querySelector(DOMStrings.inputTitle).focus()
    }

    function showError(input) {
        let errorMsg = 'Unknown error!'

        if (!input.title) {
            errorMsg = 'Enter title!'
        } else if (!input.length) {
            errorMsg = 'Enter length!'
        } else if (!input.genre) {
            errorMsg = 'Select genre!'
        }

        document.querySelector(DOMStrings.containerError).textContent = errorMsg
    }

    function displayTotalLength(tLength) {
        // If length is not passed set default value
        tLength = tLength || '-'

        document.querySelector(DOMStrings.containerTotalLength).textContent = String(
            tLength
        )
    }

    function getDOMStrings() {
        return DOMStrings
    }

    return {
        displayListItem,
        displayTotalLength,
        getDOMStrings,
        getInput: collectInput,
        clearInputs: clearFormInputs,
        displayError: showError,
    }
})()

const mainController = (function (dataCtrl, UICtrl) {
    function setupEventListeners() {
        const DOM = UICtrl.getDOMStrings()

        document
            .querySelector(DOM.buttonAddMovie)
            .addEventListener('click', ctrlAddMovieItem)

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                ctrlAddMovieItem()
            }
        })
    }

    function ctrlUpdateTotalLength() {
        // 1. Get calculated length
        const totalLength = dataCtrl.getTotalLength()

        // 2. Update the UI with new total length
        UICtrl.displayTotalLength(totalLength)
    }

    const ctrlAddMovieItem = () => {
        // 1. get form data (UI)
        const input = UICtrl.getInput()
        const { title, length, genre } = input
        // const title = input.title
        // const length = input.length
        // const  genre = input.genre

        // console.log(input);

        // 1.1 Validate data validity
        if (!title || !length || !genre) {
            // throw new Error('Something bad happened');
            // alert("Error!")
            UICtrl.displayError(input)
            return
        }

        // 2. Add movie to list
        const movie = dataCtrl.addMovie(title, length, genre)
        // console.log(movie);

        // 3. Clear form inputs
        UICtrl.clearInputs()

        // 4. show list on UI
        UICtrl.displayListItem(movie)

        // 5. Update total length UI
        ctrlUpdateTotalLength()
    }

    return {
        init() {
            console.log('App has started')
            setupEventListeners()
        },
    }
})(dataController, UIController)

mainController.init()
