import * as actionTypes from '../actions/actionTypes';

const mapModeToPallete = darkMode => {
    if (darkMode) {
        return {
            backgroundMain: '',
            backgroundSecondary: '',
            textArea: '',
            text: ''
        }
    } else {
        return {
            backgroundMain: '',
            backgroundSecondary: '',
            textArea: '',
            text: ''
        }
    }
}

const initialState = {
    darkMode: false,
    pallete: {
        backgroundMain: '',
        backgroundSecondary: '',
        textArea: '',
        text: ''
    }
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