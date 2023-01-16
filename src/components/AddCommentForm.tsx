import { memo, useState, FC } from "react";

type AddCommentFormProps = {
    addHandler: (commentText: string) => void
}

export const AddCommentForm: FC<AddCommentFormProps> = memo(({ addHandler }) => {
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState('')

    const validateInput = (text: string): boolean => {
        if (text === '') {
            setError("Please enter something, comment can't be empty")
            return false;
        } else if (text.length > 100) {
            setError("Please enter comment below 100 character")
            return false;
        } else {
            setError("")
            return true;
        }
    }
    const addCommentHandler = () => {
        const isValid = validateInput(commentText)
        if (isValid) {
            addHandler(commentText)
            setCommentText('')
        }
    }

    return (
        <div className="add_comment_form">
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows={5} cols={70} />
            {error !== '' ? <span style={{ color: 'red', fontWeight: 500 }}>{error}</span> : <></>}
            <button onClick={addCommentHandler}>Comment</button>
        </div>
    )
})