import * as actionTypes from './actionTypes';
import wf from 'word-freq';


const searchTextAsync = text => {
    return dispatch => {
        dispatch(searchTextStart());
        if (text.length > 0) {
            // All usages of non-stop words.
            const originalList = wf.freq(text);
    
            // words used 3 or more times
            let filteredList = [];
            Object.keys(originalList).forEach(word => {
                if (originalList[word] >= 3) {
                    filteredList.push({
                        word: word,
                        usage: originalList[word]
                    })
                }
            });
            dispatch(searchTextSuccess(filteredList));
        }
    }
}

const searchTextStart = text => {
    return {type: actionTypes.SEARCH_TEXT_START}
}

const searchTextSuccess = list => {
    return {type: actionTypes.SEARCH_TEXT_SUCCESS, list: list}
}

const searchTextFailure = text => {
    return {type: actionTypes.SEARCH_TEXT_FAILURE}
}

export default searchTextAsync;