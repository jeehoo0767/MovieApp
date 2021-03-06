import React, {useState, useEffect} from 'react'
import {Row, Button} from 'antd'
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Section/MovieInfo'
import GridCard from '../commons/GridCard'
import Favorite from './Section/Favorite'
import Comment from './Section/Comment'
import Axios from 'axios'
function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [Show, setShow] = useState(false)
    const [Comments, setComments] = useState([])

    useEffect(() => {

        let movieId = props.match.params.movieId

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        let getCommentsVariable = {
            postId : movieId
        }

       fetch(endpointInfo)
       .then(response => response.json())
       .then(response => {
           console.log(response)
           setMovie(response)
       })

       fetch(endpointCrew)
       .then(response => response.json())
       .then(response => {
           console.log(response)
           setCasts(response.cast)
       })

       Axios.post('/api/comment/getComments', getCommentsVariable)
       .then(response => {
           if(response.data.success){
                setComments(response.data.comments)
                console.log(response.data)
           } else {
                alert('댓글 가져오기 실패')
           }
       })
    }, [])

    const handleShow = () => {
        setShow(!Show)
    }

    const stateRefresh = (newComment) => {
        setComments(Comments.concat(newComment))
    }


    return (
        <div>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title = {Movie.original_title}
                description = {Movie.overview}
            />
            {/* Body */}
            <div style={{ width : '85%', margin : '1rem auto'}}>
                <div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
                    <Favorite 
                        movieId = {movieId}
                        userFrom = {localStorage.getItem('userId')}
                        movieInfo = {Movie}
                    />
                </div>
                {/* Movie Info */}
                <MovieInfo 
                    Movie = {Movie}
                    movieId = {movieId}
                    userFrom = { localStorage.getItem('userId') }
                />
                <br/>
                {/* Actors Grid */}
                <div style={{ display:'flex', justifyContent : 'center', margin : '2rem'}}>
                    <Button onClick={handleShow}>Toggle Actor View</Button>
                </div>
                {Show && 
                    <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => {
                        return <React.Fragment key={index}>
                            <GridCard 
                                image={cast.profile_path? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                charactorName={cast.name}
                            />
                        </React.Fragment>
                    })}
                </Row>
                }
                
            </div>
            
            <Comment stateRefresh={stateRefresh} commentList = {Comments} postId = {movieId}/>
        </div>
    )
}

export default MovieDetail
