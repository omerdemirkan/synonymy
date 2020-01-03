export default letterToType = letter => {
    switch(letter) {
        case 'n':
            return 'noun';
        case 'v':
            return 'verb';
        case 's':
            return 'adjective';
        case 'r':
            return 'adverb';
    }
}