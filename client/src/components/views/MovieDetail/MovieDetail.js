import React, {useState, useEffect} from 'react'
import {Row} from 'antd'
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Section/MovieInfo'
import GridCard from '../commons/GridCard'
import Favorite from './Section/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [Show, setShow] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

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
    }, [])

    const handleShow = () => {
        setShow(!Show)
    }

    return (
        <div >
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
                    <button onClick={handleShow}>Toggle Actor View</button>
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
            <div style={{textAlign : 'center', position : 'relative', width : '100%', margin : '1rem auto'}}>
                <h3 style={{backgroundColor : '#fff', position : 'relative', top : '17px', zIndex : '99', width : 'auto', margin : 'auto', display : 'inline-block', padding : '0px 25px'}}>Replies</h3>
                <hr style={{width : '100%'}}/>
            </div>
        </div>
    )
}

export default MovieDetail
