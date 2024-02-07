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

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'CreatedAt', value: 'createdAt', className: 'hidden md:table-cell' },
  ]
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

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
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <TableColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
              </TableColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagintaion pageSize={PAGE_SIZE} currentPage={page} itemCount={issueCount} />
    </div>
  )
}

export default IssuesPage
