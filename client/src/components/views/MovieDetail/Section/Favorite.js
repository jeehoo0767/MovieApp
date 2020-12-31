import React, {useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success) {

            } else {
                alert('좋아요 정보 가져오기 실패')
            }
        })
    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
