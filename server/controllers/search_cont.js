const express = require('express');
const router = express.Router();

const Search = require('../models/search_models');

router.get('/', (req, res) => {
    const searchData = Search.all;
    res.send(searchData);
});

router.get('/:name', (req, res) => {
    try{
        const selectedSearch = Search.findByName(req.params.name);
        res.send(selectedSearch);
    } catch(err) {
        res.status(404).send(err);
    };
})

router.get('/:name/random', (req, res) => {
    try{
        const randomSite = Search.random(req.params.name);
        res.send(randomSite);
    } catch(err) {
        res.status(404).send(err);
    };
});

module.exports = router;