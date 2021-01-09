import Axios from 'axios';
import React, {useState} from 'react'
import {ReactReduxContext, useSelector} from 'react-redux';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    
    const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] = useState("")
    
    const handleValueChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId
        }
        console.log(variable)
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
                props.stateRefresh(response.data.result);
                setCommentValue("");
                console.log("서브밋")
            } else {
                alert("댓글 저장 실패")
            }
        })
    }

    return (
        <div>
            <div style={{textAlign : 'center', position : 'relative', width : '100%', margin : '1rem auto'}}>
                <h3 style={{backgroundColor : '#fff', position : 'relative', top : '17px', zIndex : '99', width : 'auto', margin : 'auto', display : 'inline-block', padding : '0px 25px'}}>Replies</h3>
                <hr style={{width : '100%'}}/>
            </div>

            {/* comment list*/}

            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment key = {index} stateRefresh={props.stateRefresh} comment = {comment} postId = {props.movieId}/>
                        <ReplyComment stateRefresh={props.stateRefresh} parentCommentId={comment._id} commentList = {props.commentList}/>
                    </React.Fragment>
                )
            ))}

            <form style={{ dispaly : 'flex '}} onSubmit={onSubmit}>
                <textarea 
                    style = {{ width : '100%', borderRadius : '5px'}}
                    onChange={handleValueChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br/>
                <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>작성하기</button>
            </form>
        </div>
    )
}

export default Comment
