const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    req.body.movieId

    //mongodb에서 favorite 수 가져오기
    Favorite.find({ 'movieId' : req.body.movieId })
    .exec(( err, info) => {
        if(err) return res.status(400).json({ success : false , err})
        res.status(200).json({success : true, favoriteNumber : info.length})
    })
})

module.exports = router;
