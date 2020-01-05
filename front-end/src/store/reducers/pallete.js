import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: '#222',
            backgroundSecondary: 'black',
            textArea: 'black',
            userInputText: 'white',
            userInputTextHighlight: '#005e86',
            navbar: '#333',
            navbarText: 'white'
        }
    } else {
        return {
            backgroundMain: 'white',
            backgroundSecondary: 'white',
            textArea: 'black',
            userInputText: 'black',
            userInputTextHighlight: '#b1d5e5',
            navbar: '#eee',
            navbarText: 'black'
        }
    }
}

let initialState = {
    darkMode: false,
    pallete: mapModeToPallete(false)
};

if (localStorage.getItem('darkMode') === 'true') {
    initialState = {
        darkMode: true,
        pallete: mapModeToPallete(true)
    }
}

const palleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_PALLETE:
            localStorage.setItem('darkMode', !state.darkMode);
            return {
                darkMode: !state.darkMode,
                pallete: mapModeToPallete(!state.darkMode)
            }
        default:
            return state;
    }
}

export default palleteReducer;