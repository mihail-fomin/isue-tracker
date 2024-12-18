import React from 'react'
import prisma from '@/app/utils/connect'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

interface Props {
  params: Promise<{ id: string }>
}

const EditIssuePage = async (props: Props) => {
  const params = await props.params;
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}

export default EditIssuePage
