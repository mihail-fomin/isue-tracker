import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/app/utils/connect'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  console.log('params: ', params)
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) {
    notFound()
  }
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
