'use client'

import React, { useOptimistic } from 'react'
import CommentInfo from './CommentInfo'
import CommentField from './CommentField'
import { Comment, Issue, User } from '@prisma/client'

export type CommentWithAuthor = {
    comment: Comment
    author: {
        id: string
        name: string
        imageUrl?: string | null
    }
}

interface Props {
  initialComments: CommentWithAuthor[]
  issue: Issue
  currentUser?: User
}

const CommentsView = ({ initialComments, issue, currentUser }: Props) => {
  const userId = currentUser ? currentUser.id : undefined

  const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithAuthor[], string>(
    initialComments,
    (state, newCommentContent) => [
      ...state,
      {
        comment: {
          id: Date.now().toString(),
          content: newCommentContent,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: currentUser?.id || '',
          issueId: issue.id
        },
        author: {
          id: currentUser?.id || '',
          name: currentUser?.name || '',
          imageUrl: currentUser?.image || '',
        }
      }
    ]
  );

  const addComment = (newComment: Comment) => {
    addOptimisticComment(newComment.content);
  };

  return (
    <div>
      <ul>
        {optimisticComments.map((commentWithAuthor) => (
          <CommentInfo
            key={commentWithAuthor.comment.id}
            comment={commentWithAuthor}
            userId={userId}
          />
        ))}
      </ul>
      {userId && (
        <CommentField
            issue={issue}
            userId={userId}
            onAddComment={addComment}
            />
        )}
    </div>
  )
}

export default CommentsView
