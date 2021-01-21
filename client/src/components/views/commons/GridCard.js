import React from 'react'
import { Col } from 'antd';
function GridCard(props) {

    if(props.landingPage) {
        return (
            <Col lg={6} md = {8} xs = {24}>
                <div style={{ position : 'ralative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width:'100%', height : '320px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    } else if(props.SearchMovies) {
        return (
            <div className="movie">
                <a href={props.id} target="_blank">
                <img src={props.image} alt={props.title} title={props.title}></img>
                <div className="movie__data">
                <h3 className="movie__title">{
                    props.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
                    }</h3>
                <p className="movie__rating">
                    <span>평점</span> {props.rating}/10
                </p>
                <p className="movie__year">
                    <span>개봉일</span> {props.year}
                </p>
                <p className="movie__director">
                <span>감독</span> {props.director}
                </p>
                <p className="movie__actor">
                <span>배우</span> {props.actor}
                </p>
                </div>
                </a>
            </div>
        )
    } else {
        return(
            <Col lg={6} md = {8} xs = {24}>
                <div style={{ position : 'ralative'}}>
                        <img style={{width:'100%', height : '320px'}} src={props.image} alt={props.charactorName}/>
                </div>
            </Col>
            )
    }

}
export default GridCard
