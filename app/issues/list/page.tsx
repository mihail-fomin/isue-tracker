import React from 'react'
import prisma from '@/app/utils/connect'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'
import Pagintaion from '@/app/components/Pagintaion'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

  const page = parseInt(searchParams.page) || 1
  const PAGE_SIZE = 10

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  const issueCount = await prisma.issue.count({ where: { status } })

  return (
    <div className="mb-5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagintaion pageSize={PAGE_SIZE} currentPage={page} itemCount={issueCount} />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
}

export default IssuesPage
