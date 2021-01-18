import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { FaCode } from "react-icons/fa";
import GridCard from '../commons/GridCard'
import MainImage from './Sections/MainImage'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { NAVER_API_KEY, NAVER_SECRET_KEY } from '../../NaverConfig'
import { Row,Button } from 'antd';
import Axios from 'axios';
import Search from 'antd/lib/input/Search';

function LandingPage() {
    
    const reduxValue = useSelector(state => state.value.value)

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [SearchMovies, setSearchMovies] = useState([])

    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetchMovies(endpoint)

        Axios.get('/v1/search/movie.json', {
            params : {
                query : Search,
                display : 20
            },
            headers : {
                'X-Naver-Client-Id' : NAVER_API_KEY,
                'X-Naver-Client-Secret': NAVER_SECRET_KEY
            }
        })
        .then(response => {
            console.log(response.data.items)
            setSearchMovies(response.data.items)
        })
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

    const filterGridCardComponent = (data) => {
        if(reduxValue){
            data = data.filter((item) => {
                return item.original_title.toLowerCase().indexOf(reduxValue) > -1
            });
        }

        return data.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <GridCard 
                        landingPage
                        image={item.poster_path? `${IMAGE_BASE_URL}w500${item.poster_path}` : null}
                        movieId={item.id}
                        movieName={item.original_title}
                    />
                </React.Fragment>
            )
        })
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
                    {Movies && filterGridCardComponent(Movies)}
                </Row>
           </div>

           <div style={{display : 'flex', justifyContent : 'center'}}>
                <Button onClick = {LoadMoreItems}>Load More</Button>
           </div>
        </div>
    )
}

export default LandingPage
