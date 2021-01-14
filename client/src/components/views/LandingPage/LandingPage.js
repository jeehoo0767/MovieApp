import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { FaCode } from "react-icons/fa";
import GridCard from '../commons/GridCard'
import MainImage from './Sections/MainImage'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { Row,Button } from 'antd';

function LandingPage() {
    
    const reduxValue = useSelector(state => state.user)

    console.log(reduxValue)

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [AllMovies, setAllMovies] = useState([])

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (endpoint) => {
        
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            console.log(Movies)
            setMainMovieImage(response.results[Math.floor(Math.random() * 10)])
            setCurrentPage(response.page);
        })
    }

    const LoadMoreItems = () => {
        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`

        fetchMovies(endpoint)
    }


    return (
        <div style={{ width : '100%', margin : '0'}}>
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title = {MainMovieImage.original_title}
                    description = {MainMovieImage.overview}
                /> 
            }
           <div style={{ width:'85%', margin : '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => {
                        return <React.Fragment key={index}>
                            <GridCard 
                                landingPage
                                image={movie.poster_path? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    })}
                </Row>
           </div>

           <div style={{display : 'flex', justifyContent : 'center'}}>
                <Button onClick = {LoadMoreItems}>Load More</Button>
           </div>
        </div>
    )
}

export default LandingPage
