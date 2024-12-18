import React from 'react'
import prisma from '@/app/utils/connect'
import { notFound } from 'next/navigation'
import EditIssuePageClient from './EditIssuePageClient'

interface Props {
  params: Promise<{ id: string }>
}

const EditIssuePage = async (props: Props) => {
  const params = await props.params;
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) notFound()

  return <EditIssuePageClient issue={issue} />
}

export default EditIssuePage
