import synonyms from 'synonyms';

// The only npm library of this sort that works with jsx
// is-word and check-word all result in typeErrors

export const isValidWord = word => {
    if (synonyms(word)) {
        return true;
    } else {
        return false;
    }
}