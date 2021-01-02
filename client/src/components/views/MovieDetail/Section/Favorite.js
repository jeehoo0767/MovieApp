import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('좋아요 정보 가져오기 실패')
            }
        })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert('좋아요 실패')
            }
        })

    }, [])

    const favoriteHandler = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber -1)
                    setFavorited(!Favorited)
                } else {
                    alert('좋아요 취소 실패')
                }
            }) 
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber +1)
                    setFavorited(!Favorited)
                } else {
                    alert('좋아요 리스트 넣기 실패')
                }
            })
        }
    }

    return (
        <div>
            <Button onClick={favoriteHandler}>{Favorited ? "Not Favorited" : `Add To Favorite ${FavoriteNumber}`}</Button>
        </div>
    )
}

export default Favorite
