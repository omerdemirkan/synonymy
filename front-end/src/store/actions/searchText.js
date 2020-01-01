import * as actionTypes from './actionTypes';
import wf from 'word-freq';
import usage from 'norvig-frequencies';

const getExpectedFrequency = word => {
    word = word.toUpperCase();
    const index = usage.indexOf(word)
    // Rough yet surprisingly accurate formula to estimate 
    // frequency of the word used in everyday language (Pareto distribution)
    return (.0714 / index)
}

const getSynonyms = word => {

}

const searchTextAsync = (text, numWords) => {
    return dispatch => {
        dispatch(searchTextStart());
        localStorage.setItem('text', text);
        if (text.length > 0) {
            // All usages of non-stop words.
            const originalList = wf.freq(text);
            console.log(originalList);

            let overusedList = [];

            Object.keys(originalList).forEach(word => {
                if (originalList[word] >= 3) {
                    const expectedFrequency = getExpectedFrequency(word);
                    const userFrequency = originalList[word] / numWords;
                    const overusedMultiplier = userFrequency / expectedFrequency;
                    if (overusedMultiplier > 50) {

                        overusedList.push({
                            word: word,
                            multiplier: overusedMultiplier
                        })
                    }
                }
            });
            
            dispatch(searchTextSuccess(overusedList));
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