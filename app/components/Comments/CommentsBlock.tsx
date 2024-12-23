import { Box } from '@radix-ui/themes'
import React from 'react'
import prisma from '../../utils/connect'
import { Issue } from '@prisma/client'
import { getServerSession } from 'next-auth'
import CommentsView from './CommentsView'
import { getCommentsWithAuthors } from '@/app/utils/user'

const getCurrentUser = async () => {
  const session = await getServerSession()
  const email = session?.user?.email || ''

  if (email) {
    return await prisma.user.findUnique({ where: { email } })
  }
}

const CommentsBlock = async ({ issue }: { issue: Issue }) => {
  const comments = await getCommentsWithAuthors(issue.id)

  const user = await getCurrentUser() || undefined

  return (
    <Box data-name="comments-block" className="md:col-span-5 md:max-w-[30rem]">
      <CommentsView initialComments={comments} issue={issue} currentUser={user}/>
    </Box>
  )
}

export default CommentsBlock
