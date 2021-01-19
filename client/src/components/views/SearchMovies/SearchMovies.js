import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import {Space, Input} from 'antd';
import {changeValue} from '../../../_actions/value_action'

function SearchMovies() {
    
    const [SearchValue, setSearchValue] = useState("")

    const { Search } = Input;

    const dispatch = useDispatch()

    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value)
        dispatch(changeValue(e.target.value))
      }

    return (
        <div style={{ width : '100%', padding : '20px', display : 'flex', justifyContent : 'center'}}>
            <Space style= {{ width : '30%'}} direction="vertical">
                <Search placeholder="input search text" value ={SearchValue} onChange = {onSearchValueChange} onSearch enterButton style={{marginTop : '8px'}}/>
            </Space>
        </div>
    )
}

export default SearchMovies
