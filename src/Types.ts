export type User = {
    id: number,
    name: string;
}


export type Comment = {
    id: number;
    text: string;
    parentId: number | null;
    replies: number[];
    author: string;
}

export type PartialComment = {
    text?: string;
}

export type State = {
    comments: Comment[];
    loader: boolean;
}

export type AddCommentPayload = {
    comment: Comment;
}
export type AddReplyPayload = {
    parentId: number;
    reply: Comment;
}


export type Action = {
    type: 'ADD_COMMENT' | 'ADD_REPLY' | 'DELETE_COMMENT' | 'FINISH_LOADING' | 'START_LOADING' | 'UPDATE_COMMENT';
    payload: {
        comment?: Comment;
        parentId?: number;
        reply?: Comment;
        commentId?: number;
        commentUpdate?: PartialComment;
    };
}

export type CommentContextValue = {
    state: State,
    dispatch: React.Dispatch<Action>
}