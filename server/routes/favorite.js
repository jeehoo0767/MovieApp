const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    //mongodb에서 favorite 수 가져오기
    Favorite.find({ 'movieId' : req.body.movieId })
    .exec(( err, info) => {
        if(err) return res.status(400).json({ success : false , err})
        res.status(200).json({success : true, favoriteNumber : info.length})
    })
})

router.post('/favorited', (req, res) => {
    // 사용자가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    Favorite.find({ 'movieId' : req.body.movieId, 'userFrom' : req.body.userFrom })
    .exec(( err, info) => {
        if(err) return res.status(400).json({ success : false , err})
        // 클라이언트에 정보 보내기

        let result = false;
        if(info.length !== 0) {
            result = true;
        }

        res.status(200).json({success : true, favorited : result})
    })
})

module.exports = router;
