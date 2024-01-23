import React from 'react'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '@/app/utils/connect'
import { IssueStatusBadge } from '@/app/components'
import IssueActions from './IssueActions'
import delay from 'delay'
import { Link } from '@/app/components'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()
  await delay(2000)

  return (
    <div className="mb-5">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Created</TableColumnHeaderCell>
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
    </div>
  )
}

export default IssuesPage
