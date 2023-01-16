import { useContext } from "react"

import { CommentsContext } from "../context/comment-context";
import { UserContex } from "../context/user-context";
import { AddCommentForm } from "./AddCommentForm";
import { CommentView } from "./Comment";

export const CommentList = () => {
    const { state, dispatch } = useContext(CommentsContext)
    const { currentUser } = useContext(UserContex)

    const handleAddComment = (commentText: string) => {
        dispatch({
            type: 'ADD_COMMENT',
            payload: {
                comment: {
                    id: Date.now(),
                    text: commentText,
                    parentId: null,
                    replies: [],
                    author: currentUser?.name ?? ''
                }
            }
        })
    }

    const handleAddReply = (parentId: number, text: string, isEdit: boolean = false) => {
        console.log('isEdit', isEdit, parentId)
        if (isEdit) {
            dispatch({
                type: 'UPDATE_COMMENT',
                payload: {
                    commentId: parentId,
                    commentUpdate: {
                        text
                    }
                }
            })
        } else {
            dispatch({
                type: 'ADD_REPLY',
                payload: {
                    parentId: parentId,
                    reply: {
                        id: Date.now(),
                        text: text,
                        parentId: null,
                        replies: [],
                        author: currentUser?.name ?? ''
                    }
                }
            })
        }
    }

    const deleteComment = (commentId: number) => {
        dispatch({ type: 'START_LOADING', payload: {} })
        dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                commentId: commentId
            }
        })
        dispatch({ type: 'FINISH_LOADING', payload: {} })
    }


    return (
        <div className="comments-container">
            <AddCommentForm addHandler={handleAddComment} />
            <div className="comments">
                {state.comments.filter(c => c.parentId === null).map(comment => <CommentView key={comment.id} comment={comment} replyHandler={handleAddReply} deleteHandler={deleteComment} />)}
            </div>
        </div>
    )
}