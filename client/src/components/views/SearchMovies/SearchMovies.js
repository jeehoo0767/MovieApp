import React, {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import Axios from 'axios'
import {Space, Input, Row} from 'antd';
import { NAVER_API_KEY, NAVER_SECRET_KEY } from '../../NaverConfig'
import {changeValue} from '../../../_actions/value_action'
import GridCard from '../commons/GridCard'
import "./Sections/SearchMovies.css"

function SearchMovies(props) {
    
    const [SearchValue, setSearchValue] = useState("")
    const [SearchMovies, setSearchMovies] = useState([])

    const { Search } = Input;

    const dispatch = useDispatch()

    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value)
        dispatch(changeValue(e.target.value))
    }

    const onSubmit =  (value) => {
        Axios.get('/v1/search/movie.json', {
            params : {
                query : value,
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
    }

    const filterGridCardComponent = (data) => {

        return data.map((item, index) => {
            return (
                    <GridCard 
                        SearchMovies
                        key={props.link}
                        id = {item.link}
                        image={item.image}
                        title={item.title}
                        rating={item.userRating}
                        year = {item.pubDate}
                        director = {item.director}
                        actor = {item.actor}
                    />
            )
        })
    }


    return (
        <div style={{ width : '100%', padding : '20px'}}>
            <div style ={{ display : 'flex', justifyContent : 'center' }}>
                <Space style= {{ width : '30%'}} direction="vertical">
                    <Search placeholder="input search text" value ={SearchValue} onChange = {onSearchValueChange} onSearch={onSubmit} enterButton style={{marginTop : '8px'}}/>
                </Space>
            </div>
            <div style={{ width:'85%', margin : '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr style={{marginBottom : '50px'}}/>
                <Row gutter={[16, 16]}>
                    {SearchMovies && filterGridCardComponent(SearchMovies)}
                </Row>
           </div>
        </div>
    )
}

export default SearchMovies
