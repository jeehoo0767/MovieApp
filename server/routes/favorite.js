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

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom : req.body.userFrom})
    .exec(( err, doc ) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success : true, doc})
    })
    // 클라이언트에서 보내준 movieId와 userFrom을 이용해 findOneAndDelete()메소드를 이용해 찾아서 지운다.

})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)

    favorite.save((err, dec) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success : true})
    })
    //favorite 인스턴스 생성 후 인자로 req.body를 준다.
    //.save() 메소드를 통해 도큐먼트를 몽고DB에 저장
})

module.exports = router;
