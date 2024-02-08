import React from 'react'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '@/app/utils/connect'
import { IssueStatusBadge } from '@/app/components'
import IssueActions from './IssueActions'
import { Link } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagintaion from '@/app/components/Pagintaion'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'

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

export default IssuesPage
