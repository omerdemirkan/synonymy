import * as actionTypes from '../actions/actionTypes';

const initialState = {
    word: null,
    synonyms: null
}

const inspectReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_INSPECT:
            return {
                word: action.word,
                synonyms: action.synonyms
            }
        case actionTypes.RESET_INSPECT:
            return initialState;
        default: 
        return state;
    }
}

export default inspectReducer;