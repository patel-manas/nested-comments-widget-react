import { createContext, FC, ReactNode, useEffect, useReducer } from "react";
import produce from "immer";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialState } from "./initialState";

import { Action, CommentContextValue, State } from "../Types";

const CommentsContext = createContext<CommentContextValue>({ state: { comments: [], loader: false }, dispatch: () => { } })

type CommentsProviderProps = {
    children: ReactNode
}

const CommentsProvider = ({ children }: CommentsProviderProps) => {
    const [localStorageState, setLocalStorageState] = useLocalStorage<State>("state")
    const [state, dispatch] = useReducer((state: State, action: Action) =>
        produce(state, (draft) => {
            switch (action.type) {
                case 'ADD_COMMENT': {
                    const { comment } = action.payload;
                    if (comment) {
                        draft.comments.push({ ...comment, parentId: null, replies: [] });
                    }
                    break;
                }
                case 'ADD_REPLY': {
                    const { parentId, reply } = action.payload;
                    if (parentId && reply) {
                        const parentComment = draft.comments.find(c => c.id === parentId);
                        if (parentComment) {
                            parentComment.replies.push(reply.id);
                            draft.comments.push({ ...reply, parentId: parentId, replies: [] });
                        }
                    }
                    break;
                }
                case 'UPDATE_COMMENT': {
                    const { commentId, commentUpdate } = action.payload;
                    if (commentId) {
                        const currentCommentIndex = draft.comments.findIndex(c => c.id === commentId);
                        if (currentCommentIndex >= 0) {
                            const updated = { ...draft.comments[currentCommentIndex], ...commentUpdate }
                            draft.comments[currentCommentIndex] = updated
                        }
                    }
                    break;
                }

                case 'DELETE_COMMENT':
                    const { commentId } = action.payload;
                    if (commentId) {
                        const currentComment = draft.comments.find(c => c.id === commentId);
                        if (currentComment) {
                            const targetCommentIds = [commentId, ...(currentComment.replies.length > 0 ? currentComment.replies : [])]
                            draft.comments = draft.comments.filter(cm => !targetCommentIds.includes(cm.id))
                        }
                    }
                    break;
            }
        }),
        localStorageState ? localStorageState : initialState
    );

    useEffect(() => {
        setLocalStorageState(state)
    }, [state, setLocalStorageState])

    return (
        <CommentsContext.Provider value={{ state, dispatch }}>
            {children}
        </CommentsContext.Provider>
    )
}

export { CommentsProvider, CommentsContext };