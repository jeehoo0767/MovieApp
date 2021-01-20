import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import {Space, Input} from 'antd';
import {changeValue} from '../../../_actions/value_action'

function SearchMovies() {
    
    const [SearchValue, setSearchValue] = useState("")
    const [SearchMovies, setSearchMovies] = useState([])

    const { Search } = Input;

    const dispatch = useDispatch()

    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value)
        dispatch(changeValue(e.target.value))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        Axios.get('/v1/search/movie.json', {
            params : {
                query : e.target.value,
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
        filterGridCardComponent(SearchMovies)
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
        <div style={{ width : '100%', padding : '20px', display : 'flex', justifyContent : 'center'}}>
            <Space style= {{ width : '30%'}} direction="vertical">
                <Search placeholder="input search text" value ={SearchValue} onChange = {onSearchValueChange} onSearch={onSubmit} enterButton style={{marginTop : '8px'}}/>
            </Space>
        </div>
    )
}

export default SearchMovies
