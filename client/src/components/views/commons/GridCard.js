import React from 'react'
import { Col } from 'antd';
function GridCard(props) {
    return (
        <Col lg={6} md = {8} xs = {24}>
            <div style={{ position : 'ralative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img src={props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col>
    )
}
export default GridCard
