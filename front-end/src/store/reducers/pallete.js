import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: 'black',
            backgroundSecondary: 'black',
            textArea: 'white',
            userInputText: 'white',
            navbar: 'black',
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

const initialState = {
    darkMode: false,
    pallete: mapModeToPallete(false)
}

const palleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes:
            return {
                darkMode: action.darkMode,
                pallete: mapModeToPallete(action.darkMode)
            }
        default:
            return state;
    }
}

export default palleteReducer;