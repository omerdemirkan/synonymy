import * as actionTypes from '../actions/actionTypes';

const initialState = {
    modal: false
}

export default function tutorialReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_TUTORIAL_MODAL:
            return {
                modal: !state.modal
            };
        default: 
            return state;
    }
}