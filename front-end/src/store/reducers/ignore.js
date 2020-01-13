import * as actionTypes from '../actions/actionTypes';

const initialState = {
    words: []
}

const ignoreReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_IGNORE:
            return {
                words: state.words.concat(action.word)
            }
        case actionTypes.REMOVE_IGNORE:
            let newIgnoredWords = [...state.words];
            newIgnoredWords.pop();
            return {
                words: newIgnoredWords
            }
        default:
            return state
    }
}

export default ignoreReducer;