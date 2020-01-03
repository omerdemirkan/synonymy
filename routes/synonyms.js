const router = require('express').Router()
const moby = require('moby');

router.post('/', (req, res) => {
    const list = req.body.list;
    if (list && list.length < 30 && list.length > 0) {
        list.forEach(object => {
            const synonyms = moby.search(object.word)
            if (synonyms && synonyms.length > 0) {
                object.synonyms = synonyms;
            } else {
                delete object;
            }
        });
    } else {
        res.json('eRROR in request (issue with list object)');
    }
    res.json(list)
})

module.exports = router;