import * as actionTypes from '../actions/actionTypes';
import wf from 'word-freq';

let initialState = null;

const storedText = localStorage.getItem('text');

if (storedText && storedText.length > 0) {
    initialState = {
        text: storedText,
        loading: false,
        numWords: wf.tokenise(storedText, false).length
    }
} else {
    initialState = {
        text: '',
        loading: false,
        numWords: 0
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
                list: action.list
            }
        case actionTypes.SEARCH_TEXT_FAILURE:
            return state
        default:
            return state;
    }
}

export default userInputReducer;