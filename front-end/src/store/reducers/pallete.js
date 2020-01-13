import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: '#14191E',
            backgroundSecondary: 'black',
            userInputText: '#93ADBE',
            userInputTextHighlight: 'rgb(0, 153, 255)',
            accentText: '#2090DB',
            navbarText: '#ABB7C0'
        }
    } else {
        return {
            backgroundMain: '#DFE6EC',
            backgroundSecondary: 'white',
            userInputText: '#10466A',
            userInputTextHighlight: 'rgb(0, 153, 255)',
            accentText: '#2090DB',
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