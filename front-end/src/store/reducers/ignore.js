import * as actionTypes from '../actions/actionTypes';

const initialState = {
    words: []
}

const ignoreReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default ignoreReducer;