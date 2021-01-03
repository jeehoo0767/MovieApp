import React, {useState, useEffect} from 'react'
import './favorite.css'
import Axios from 'axios'
import {Button} from 'antd'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom : localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보 가져오기 실패')
            }
        })
    }, [])

    return (
        <div>
            <div style={{ width : '85%', margin : '3rem auto'}}>
                <h3>Favorite Movies</h3>
                <hr/>

                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>Remove from favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Favorites.map((favorite, index) => {
                            return <tr key={index}>
                                <td>{favorite.movieTitle}</td>
                                <td>{favorite.movieRunTime}</td>
                                <td><Button>Remove</Button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
