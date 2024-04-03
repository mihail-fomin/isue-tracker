import prisma from '@/app/utils/connect'
import { Comment } from '@prisma/client'
import { Avatar,  Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'



const CommentInfo = async ({comment}: {comment: Comment}) => {
  const author = await prisma.user.findUnique({where: {id: comment.userId}})

  return (
    <Card className='max-w-[30rem]' mb='2'>
      <Flex gap='3'>
        <Avatar
            src={author?.image!}
            fallback="?"
            size="3"
            radius="full"
            referrerPolicy="no-referrer"
          />
        <Flex justify='between' align='center' className='w-full'>
          <Text>{author?.name}</Text>
          <Text>
            {comment.createdAt.toDateString()}
          </Text>
        </Flex>
      </Flex>
      <Text >
        {comment.content}
      </Text>
    </Card>
  )
}

export default CommentInfo