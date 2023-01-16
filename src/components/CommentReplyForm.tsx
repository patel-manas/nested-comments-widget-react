import React, { useEffect, useState } from 'react';

interface Props {
    parentId: number;
    onSubmit: (parentId: number, reply: string, isEdit?: boolean) => void;
    onFinish: () => void;
    text?: string;
}

const CommentReplyForm: React.FC<Props> = ({ parentId, onSubmit, onFinish, text }) => {
    const [reply, setReply] = useState(text ? text : '');
    const [isEdit, setEdit] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(event.target.value);
    };

    useEffect(() => {
        if (text) {
            setEdit(true)
        }
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(parentId, reply, isEdit);
        setReply('');
        setEdit(false)
        onFinish();
    };

    return (
        <form onSubmit={handleSubmit} className="comment-reply-form">
            <textarea value={reply} onChange={handleChange} rows={10} />
            <div className="btn-group">
                <button type="submit">{text ? 'Update' : 'Submit'}</button>
                <button onClick={() => {
                    setReply('');
                    onFinish()
                }}>Cancel</button>
            </div>

        </form>
    );
};

export default CommentReplyForm;
