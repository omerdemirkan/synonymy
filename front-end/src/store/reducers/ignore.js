// List of ignored words in calculating overused.
// Managed in redux because Inspect renders conditionally
// and results in a spiratic snackbar.

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    words: [],
    ignoreModal: false,
    lastIgnored: ''
}

const ignoreReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_IGNORE:
            return {
                words: state.words.concat(action.word),
                lastIgnored: action.word,
                ignoreModal: true
            }
        case actionTypes.REMOVE_IGNORE:
            let newIgnoredWords = [...state.words];
            newIgnoredWords.pop();
            return {
                ...state,
                words: newIgnoredWords,
                ignoreModal: false
            }
        case actionTypes.CLOSE_IGNORE_MODAL:
            return {
                ...state,
                ignoreModal: false
            }
        default:
            return state
    }
}

export default ignoreReducer;