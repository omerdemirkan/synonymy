import * as actionTypes from './actionTypes';
import wf from 'word-freq';
import usage from 'norvig-frequencies';
import axios from '../../axios';
import {isValidWord} from '../../helper/isValidWord';

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
            // 1. Must be a valid word
            // 2. Must be used in the text 3 or more times
            // 3. Must exist within the norvig-frequencies library of words
            // 4. Frequency of the word's usage must be at least 5 times more than total frequency (referred to as multiplier)
            // 5. Must have a minimum of one synonym
            // Extra: Must be within the top ten most overused in the text

            Object.keys(originalList).forEach(word => {

                const numFound = originalList[word];

                if (numFound >= 3) {

                    if (isValidWord(word)) {
    
                        const expectedFrequency = getExpectedFrequency(word);
    
                        if (expectedFrequency) {
                            const userFrequency = numFound / numWords;
                            const overusedMultiplier = Math.floor(userFrequency / expectedFrequency);
        
                            if (overusedMultiplier > 5) {
        
                                overusedList.push({
                                    word: word,
                                    multiplier: overusedMultiplier,
                                    numFound: numFound
                                })
                            }
                        }
                    }
                }
            });

            // Descending order by multiplier
            overusedList.sort((a, b) => b.multiplier - a.multiplier);
            // Limit to ten words (Most overused)
            overusedList = overusedList.slice(0, 10)
            console.log(overusedList);

            // axios.post('/synonyms/', {
            //     list: overusedList
            // })
            // .then(res => {
            //     console.log(res.data);
                
            //     // dispatch(searchTextSuccess(res.data));
            // })
            // .catch(err => {
            //     console.log(err);
            // });

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