import React, {useEffect} from 'react'
import './favorite.css'
import Axios from 'axios'

function FavoritePage() {

    useEffect(() => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom : localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
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

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
