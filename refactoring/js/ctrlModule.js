import * as dataCtrl from './dataModule.js'
import * as UICtrl from './uiModule.js'

function setupEventListeners() {
    const DOM = UICtrl.getDOMStrings()

    document.querySelector(DOM.buttonAddMovie).addEventListener('click', ctrlAddMovieItem)

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

export const init = () => {
    console.log('App has started')
    setupEventListeners()
}
