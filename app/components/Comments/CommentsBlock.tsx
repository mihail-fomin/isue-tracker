import { Box } from '@radix-ui/themes'
import React from 'react'
import prisma from '../../utils/connect'
import Comment from './Comment'


const CommentsBlock = async ({issueId}: {issueId: string}) => {
  const comments = await prisma.comment.findMany({where: {issueId: issueId}})

  return (
    <Box className="md:col-span-5">
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      </ul>
    </Box>
  )
}

export default CommentsBlock