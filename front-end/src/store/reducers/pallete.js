import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: '#222',
            backgroundSecondary: 'black',
            textArea: 'white',
            userInputText: 'white',
            navbar: '#333',
            navbarText: 'white'
        }
    } else {
        return {
            backgroundMain: 'white',
            backgroundSecondary: 'white',
            textArea: 'black',
            userInputText: 'black',
            navbar: '#eee',
            navbarText: 'black'
        }
    }
}

let initialState = {
    darkMode: false,
    pallete: mapModeToPallete(false)
}

if (localStorage.getItem('darkMode')) {
    initialState = {
        darkMode: true,
        pallete: mapModeToPallete(true)
    }
}

const palleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_PALLETE:
            return {
                darkMode: !state.darkMode,
                pallete: mapModeToPallete(!state.darkMode)
            }
        default:
            return state;
    }
}

export default palleteReducer;