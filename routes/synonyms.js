const router = require('express').Router()
var thesaurus = require("thesaurus");

router.post('/', (req, res) => {
    const wordList = req.body.list;
    let synonymsList = {}
    if (wordList && wordList.length < 30 && wordList.length > 0) {
        wordList.forEach(object => {
            // const synonyms = moby.search(object.word)
            const synonyms = thesaurus.find(object.word);
            if (synonyms && synonyms.length > 0) {
                synonymsList[object.word] = synonyms
            }
        });
    } else {
        res.json('eRROR in request (issue with list object)');
    }
    res.json(synonymsList)
})

module.exports = router;