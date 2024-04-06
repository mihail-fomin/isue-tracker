import prisma from '@/app/utils/connect'
import { Comment } from '@prisma/client'
import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import RemoveButton from './DeletteCommentButton'

interface Props {
  comment: Comment
  userId?: string
}

const CommentInfo = async ({ comment, userId }: Props) => {
  const author = await prisma.user.findUnique({ where: { id: comment.userId } })

  return (
    <Card className="max-w-[30rem]" mb="2">
      <Flex gap="3">
        <Avatar src={author?.image!} fallback="?" size="3" radius="full" referrerPolicy="no-referrer" />
        <Flex justify="between" align="center" className="w-full">
          <Text>{author?.name}</Text>
          <Text>{comment.createdAt.toDateString()}</Text>
          {comment.userId === userId && <RemoveButton commentId={comment.id} />}
        </Flex>
      </Flex>
      <Text>{comment.content}</Text>
    </Card>
  )
}

export default CommentInfo
