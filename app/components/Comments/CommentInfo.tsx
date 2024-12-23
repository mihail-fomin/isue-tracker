import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import RemoveButton from './DeletteCommentButton'
import { CommentWithAuthor } from './CommentsView'

interface Props {
  comment: CommentWithAuthor
  userId?: string
}

const CommentInfo = ({ comment, userId }: Props) => {
  return (
    <Card data-name="comment-card" mb="2">
      <Flex gap="3">
        <Avatar src={comment.author?.imageUrl!} fallback="?" size="3" radius="full" referrerPolicy="no-referrer" />
        <Flex justify="between" align="center" className="w-full">
          <Text>{comment.author?.name}</Text>
          <Text>{comment.comment.createdAt.toDateString()}</Text>
          {comment.author.id === userId && <RemoveButton commentId={comment.comment.id} />}
        </Flex>
      </Flex>
      <Text>{comment.comment.content}</Text>
    </Card>
  )
}

export default CommentInfo
