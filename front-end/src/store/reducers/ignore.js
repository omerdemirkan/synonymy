import * as actionTypes from '../actions/actionTypes';

const initialState = {
    words: [],
    ignoreModal: false
}

const ignoreReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_IGNORE:
            return {
                words: state.words.concat(action.word),
                ignoreModal: true
            }
        case actionTypes.REMOVE_IGNORE:
            let newIgnoredWords = [...state.words];
            newIgnoredWords.pop();
            return {
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