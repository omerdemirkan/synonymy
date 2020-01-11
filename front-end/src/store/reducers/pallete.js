import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: 'black',
            backgroundSecondary: 'black',
            textArea: 'black',
            userInputText: 'white',
            userInputTextHighlight: '#005e86',
            accentText: '#2090DB',
            navbar: 'rgb(47, 52, 58)',
            navbarText: 'white'
        }
    } else {
        return {
            backgroundMain: '#DFE6EC',
            backgroundSecondary: 'white',
            textArea: '#DFE6EC',
            userInputText: '#10466A',
            userInputTextHighlight: '#6AC3FF',
            accentText: '#2090DB',
            navbar: '#2090DB',
            navbarText: '#E7ECF0'
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