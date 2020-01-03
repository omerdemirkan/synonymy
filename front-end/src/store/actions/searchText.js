import * as actionTypes from './actionTypes';
import wf from 'word-freq';
import usage from 'norvig-frequencies';
import axios from '../../axios';

const getExpectedFrequency = word => {
    word = word.toUpperCase();
    const index = usage.indexOf(word)
    // Rough yet surprisingly accurate formula to estimate 
    // frequency of the word used in everyday language (Pareto distribution)
    return (.0714 / index)
}

const searchTextAsync = (text, numWords) => {
    return dispatch => {
        dispatch(searchTextStart());
        localStorage.setItem('text', text);
        if (text.length > 0) {
            // All usages of non-stop words found in the text.
            const originalList = wf.freq(text);

            let overusedList = [];

            // Qualifications to be considered overused:
            // 1. Must be used in the text 3 or more times
            // 2. Must exist within the norvig-frequencies library of words
            // 3. Frequency of the word's usage must be at least 5 times more than total frequency (referred to as multiplier)
            // 4. Must have a minimum of one synonym

            Object.keys(originalList).forEach(word => {

                const numFound = originalList[word];
                if (numFound >= 3) {

                    const expectedFrequency = getExpectedFrequency(word);

                    if (expectedFrequency) {
                        const userFrequency = numFound / numWords;
                        const overusedMultiplier = userFrequency / expectedFrequency;
    
                        if (overusedMultiplier > 5) {
    
                            overusedList.push({
                                word: word,
                                multipler: overusedMultiplier,
                                numFound: numFound
                            })
                        }
                    }
                }
            });

            // Descending order by multiplier
            overusedList.sort((a, b) => {return b.multiplier - a.multiplier});

            axios.post('/synonyms/', {
                list: overusedList
            })
            .then(res => {
                console.log(res);
                // overusedList = overusedList.slice(0, 9);
                // dispatch(searchTextSuccess(overusedList));
            })
            .catch(err => {
                console.log(err);
            });

            // Format:
            // word: String,
            // multiplier: Number,
            // numFound: Number,
            // synonyms: Object
            
            
        }
    }
}

const searchTextStart = text => {
    return {type: actionTypes.SEARCH_TEXT_START}
}

const searchTextSuccess = overused => {
    return {type: actionTypes.SEARCH_TEXT_SUCCESS, overused: overused}
}

const searchTextFailure = text => {
    return {type: actionTypes.SEARCH_TEXT_FAILURE}
}

export default searchTextAsync;