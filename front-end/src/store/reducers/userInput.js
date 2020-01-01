import * as actionTypes from '../actions/actionTypes';
import wf from 'word-freq';

let initialState = {
    text: '',
    loading: false,
    numWords: 0,
    overused: []
}

const storedText = localStorage.getItem('text');

if (storedText && storedText.length > 0) {
    initialState = {
        ...initialState,
        text: storedText,
        numWords: wf.tokenise(storedText, false).length
    }
}

const userInputReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_TEXT:
            if (!action.text) {
                return initialState;
            }
            return {
                ...state,
                text: action.text,
                numWords: wf.tokenise(action.text, false).length
            }
        case actionTypes.SEARCH_TEXT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEARCH_TEXT_SUCCESS:
            return {
                ...state,
                overused: action.overused
            }
        case actionTypes.SEARCH_TEXT_FAILURE:
            return state
        default:
            return state;
    }
}

export default userInputReducer;