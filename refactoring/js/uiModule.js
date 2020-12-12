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

function getInput() {
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

function clearInputs() {
    // Reset forma data
    document.querySelector(DOMStrings.formElement).reset()

    // Reset error if any
    document.querySelector(DOMStrings.containerError).textContent = ''

    // Set focus to title input
    document.querySelector(DOMStrings.inputTitle).focus()
}

function displayError(input) {
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

    document.querySelector(DOMStrings.containerTotalLength).textContent = String(tLength)
}

function getDOMStrings() {
    return DOMStrings
}

export {
    displayListItem,
    displayTotalLength,
    getDOMStrings,
    getInput,
    clearInputs,
    displayError,
}
