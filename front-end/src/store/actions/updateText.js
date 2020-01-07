import * as actionTypes from './actionTypes';
import wf from 'word-freq';
import usage from 'norvig-frequencies';
import axios from '../../axios';
import {isValidWord} from '../../helper/isValidWord';

// The whole point of this action creator is the same as searchText, only to avoid needlessly reaching out 
// to the api for synonyms when it isn't needed.

const getExpectedFrequency = word => {
    word = word.toUpperCase();
    const index = usage.indexOf(word)
    // Rough yet surprisingly accurate formula to estimate 
    // frequency of the word used in everyday language (Pareto distribution)
    return (.0714 / index)
}

const updateTextAsync = (text, numWords, loadedSynonyms) => {
    return dispatch => {

        dispatch(searchTextStart());

        localStorage.setItem('text', text);

        if (text.length > 0) {
            // All usages of non-stop words found in the text.
            const allWords = wf.freq(text);

            let newOverusedList = [];

            Object.keys(allWords).forEach(word => {

                const numFound = allWords[word];

                if (numFound >= 3) {

                    if (isValidWord(word)) {
    
                        const expectedFrequency = getExpectedFrequency(word);
    
                        if (expectedFrequency) {
                            const overusedMultiplier = Math.floor((numFound / numWords) / expectedFrequency);
        
                            if (overusedMultiplier > 5) {
                                newOverusedList.push({
                                    word: word,
                                    multiplier: overusedMultiplier,
                                    numFound: numFound,
                                    expectedFrequency: expectedFrequency
                                })
                            }
                        }
                    }
                }
            });

            // Descending order by multiplier
            newOverusedList.sort((a, b) => b.multiplier - a.multiplier);
            // Limit to ten words (Most overused)
            newOverusedList = newOverusedList.slice(0, 10);

            let wordsWithoutSynonyms = [];

            newOverusedList.forEach(element => {
                if (Object.keys(loadedSynonyms).includes(element.word)) {
                    element.synonyms = loadedSynonyms[element.word];
                } else {
                    wordsWithoutSynonyms.push(element);
                }
            });

            if (wordsWithoutSynonyms.length > 0) {
                axios.post('/synonyms/', {
                    list: wordsWithoutSynonyms
                })
                .then(res => {
                    loadedSynonyms = {...loadedSynonyms, ...res.data}
                })
                .catch(err => {
                    console.log(err);
                });
            }
                    
            dispatch(searchTextSuccess(newOverusedList, loadedSynonyms));
        }
    }
}

const searchTextStart = () => {
    return {type: actionTypes.SEARCH_TEXT_START}
}

const searchTextSuccess = (overusedList, loadedSynonyms) => {
    return {type: actionTypes.SEARCH_TEXT_SUCCESS, overused: overusedList, loadedSynonyms: loadedSynonyms}
}

const searchTextFailure = () => {
    return {type: actionTypes.SEARCH_TEXT_FAILURE}
}

export default updateTextAsync;