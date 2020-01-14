import * as actionTypes from '../actions/actionTypes';
import wf from 'word-freq';

let initialState = {
    text: '',
    loading: false,
    numWords: 0,
    numChars: 0,
    overused: [],
    loadedSynonyms: [],
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

            const allWords = wf.tokenise(action.text, false);

            if (!action.text || action.text.length === 0 || !allWords) {
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
                numWords: allWords.length,
                numChars: action.text.length,
                changed: true
            }
        case actionTypes.SEARCH_TEXT_START:
            console.log('inside reducer');
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEARCH_TEXT_SUCCESS:
            return {
                ...state,
                overused: action.overused,
                loadedSynonyms: action.loadedSynonyms,
                changed: false,
                loading: false
            }
        case actionTypes.SEARCH_TEXT_FAILURE:
            return state;
        case actionTypes.RESET_SEARCH:
            return {
                ...state,
                overused: []
            }
        default:
            return state;
    }
}

export default userInputReducer;