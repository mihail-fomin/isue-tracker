import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Открыто', color: 'red' },
  IN_PROGRESS: { label: 'В работе', color: 'violet' },
  CLOSED: { label: 'Закрыто', color: 'green' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
}

export default IssueStatusBadge
