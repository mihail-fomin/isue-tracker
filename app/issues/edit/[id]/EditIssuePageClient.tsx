'use client'

import React from 'react'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'
import { Issue } from '@prisma/client'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

interface Props {
  issue: Issue
}

const EditIssuePageClient = ({ issue }: Props) => {
  return <IssueForm issue={issue} />
}

export default EditIssuePageClient
