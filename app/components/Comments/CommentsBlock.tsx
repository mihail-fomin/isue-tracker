import { Box } from '@radix-ui/themes'
import React from 'react'
import prisma from '../../utils/connect'
import Comment from './Comment'
import CommentField from './CommentField'
import { Issue } from '@prisma/client'
import { getServerSession } from 'next-auth'

const getCurrentUser = async () => {
  const session = await getServerSession()
  const email = session?.user?.email || ''
  if (email) {
    return await prisma.user.findUnique({ where: { email } })
  }
}

const CommentsBlock = async ({ issue }: { issue: Issue }) => {
  const comments = await prisma.comment.findMany({ where: { issueId: issue.id } })

  const user = await getCurrentUser()

  return (
    <Box className="md:col-span-5">
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} userId={user?.id} />
        ))}
      </ul>
      <CommentField issue={issue} userId={user?.id} />
    </Box>
  )
}

export default CommentsBlock
