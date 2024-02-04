'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

interface StatusContent {
  label: string
  value?: Status
}

const IssueStatusFilter = () => {
  const router = useRouter()

  const statuses: StatusContent[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ]

  const handleValueChange = (status: string) => {
    const query = status ? `?status=${status}` : ''
    router.push('/issues/list' + query)
  }

  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || 'All'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
