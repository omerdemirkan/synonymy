const router = require('express').Router()
var thesaurus = require("thesaurus");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});

router.post('/', limiter, (req, res) => {
    const wordList = req.body.list;
    let synonymsList = {}
    if (wordList && wordList.length < 30 && wordList.length > 0) {
        wordList.forEach(object => {
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