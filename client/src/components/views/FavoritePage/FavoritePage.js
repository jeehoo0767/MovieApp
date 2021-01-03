import React, {useState, useEffect} from 'react'
import './favorite.css'
import Axios from 'axios'
import {Button, Popover} from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

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

    const renderCards = Favorites.map((favorite, index) => {
        
        const content = (
            <div>
                {favorite.moviePost ?
                <img src ={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/>: "no imgage"
            }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><Button>Remove</Button></td>
        </tr>
    })

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
                        {renderCards}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
