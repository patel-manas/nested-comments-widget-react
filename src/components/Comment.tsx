import { FC, useContext, useState, memo } from "react"

import { CommentsContext } from "../context/comment-context"
import CommentReplyForm from "./CommentReplyForm"

import { Comment } from "../Types"

type CommentViewProps = {
    comment: Comment | undefined,
    replyHandler: (parentId: number, text: string, isEdit?: boolean) => void,
    deleteHandler: (commentId: number) => void
}
const extractComment = (commentId: number, comments: Comment[]) => comments.find(c => c.id === commentId)

const timeStampToHUmanReadableTime = (timestamp: number) => {
    let date = new Date(timestamp);
    let humanReadableDate = date.toString();
    return humanReadableDate.replace('(India Standard Time)', '').replace('GMT+0530', '')
}

const getAuthorInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join('');
}

function getRandomColor() {
    const colors: string[] = ['teal', 'purple', 'red', 'grey', 'navy'];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

export const CommentView: FC<CommentViewProps> = memo(({ comment, replyHandler, deleteHandler }) => {
    const [showReply, setShowReply] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { state } = useContext(CommentsContext)

    if (!comment) {
        return <></>
    }

    const reset = () => {
        setShowReply(false)
        setIsEdit(false)
    }

    return (
        <div className="comment">
            <div className="comment_author" style={{ backgroundColor: getRandomColor() }}>{getAuthorInitials(comment.author)}</div>
            <div className="comment_content">
                <div className="comment_content_details">
                    <div className="comment_text">{comment.text}</div>
                    <div className="comment_timestamp">by {comment.author} on {timeStampToHUmanReadableTime(comment.id)}</div>
                    <div className="comment_controls">
                        <button className="comment_controls_reply" onClick={() => setShowReply(true)}>Reply</button>
                        <button className="comment_controls_delete" onClick={() => deleteHandler(comment.id)}>Delete</button>
                        <button className="comment_controls_edit" onClick={() => {
                            setShowReply(true)
                            setIsEdit(true)
                        }}>Edit</button>
                    </div>
                </div>
                <div className="comment_replies">
                    <>{showReply && (<CommentReplyForm parentId={comment.id} onSubmit={replyHandler} onFinish={() => reset()} text={isEdit ? comment.text : ''} />)}</>
                    <>{comment.replies.map(replyId => <CommentView key={replyId} comment={extractComment(replyId, state.comments)} replyHandler={replyHandler} deleteHandler={deleteHandler} />)}</>
                </div>
            </div>

        </div>
    )
})