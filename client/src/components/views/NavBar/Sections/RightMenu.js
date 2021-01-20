/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Menu, Space, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Fragment } from 'react';
import {changeValue} from '../../../../_actions/value_action'

function RightMenu(props) {

  const [SearchValue, setSearchValue] = useState("")
  
  const dispatch = useDispatch()
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value)
    dispatch(changeValue(e.target.value))
  }

  const onSearch = () => {
    
  }

  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Fragment>
        {/* <Space direction="vertical">
         <Search placeholder="input search text" value ={SearchValue} onChange = {onSearchValueChange} onSearch={onSearch} enterButton style={{marginTop : '8px'}}/>
        </Space> */}
        <Menu mode={props.mode} defaultSelectedKeys={['2']}>
          <Menu.Item key="searchMovies">
            <a href="/searchMovies">searchMovies</a>
          </Menu.Item>
          <Menu.Item key="mail">
            <a href="/login">Signin</a>
          </Menu.Item>
          <Menu.Item key="app">
            <a href="/register">Signup</a>
          </Menu.Item>
        </Menu>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Menu mode={props.mode}>
          <Menu.Item key="searchMovies">
            <a href="/searchMovies">searchMovies</a>
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      </Fragment>
    )
  }
}

export default withRouter(RightMenu);

