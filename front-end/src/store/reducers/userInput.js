import * as actionTypes from '../actions/actionTypes';
import wf from 'word-freq';

let initialState = {
    text: '',
    loading: false,
    numWords: 0,
    numChars: 0,
    overused: [],
    changed: true
}

const storedText = localStorage.getItem('text');

if (storedText && storedText.length > 0) {
    initialState = {
        ...initialState,
        text: storedText,
        numChars: storedText.length,
        numWords: wf.tokenise(storedText, false).length
    }
}

const userInputReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_TEXT:
            if (!action.text || action.text.length === 0) {
                return {
                    text: '',
                    loading: false,
                    numWords: 0,
                    numChars: 0,
                    overused: [],
                    changed: true
                };
            }
            return {
                ...state,
                text: action.text,
                numWords: wf.tokenise(action.text, false).length,
                numChars: action.text.length,
                changed: true
            }
        case actionTypes.SEARCH_TEXT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEARCH_TEXT_SUCCESS:
            return {
                ...state,
                overused: action.overused,
                changed: false
            }
        case actionTypes.SEARCH_TEXT_FAILURE:
            return state
        default:
            return state;
    }
}

export default userInputReducer;