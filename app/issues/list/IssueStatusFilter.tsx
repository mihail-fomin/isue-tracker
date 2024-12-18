'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

interface StatusContent {
  label: string
  value?: Status
}

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const statuses: StatusContent[] = [
    { label: 'Все' },
    { label: 'Открытые', value: 'OPEN' },
    { label: 'В работе', value: 'IN_PROGRESS' },
    { label: 'Закрытые', value: 'CLOSED' },
  ]

  /**
   * This function is defined to handle changes in the selected value. When the user selects a status,
   * this function constructs a new URLSearchParams object, appends the selected status and, if present,
   * the existing 'orderBy' parameter. Finally, it updates the route using router.push()
   * with the new query parameters.
   * @param status
   */
  const handleValueChange = (status: string) => {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!)
    }
    const query = status ? `?status=${status}` : ''
    router.push('/issues/list' + query)
  }

  return (
    <Select.Root defaultValue={searchParams.get('status') || ''} onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Отфильтровать по статусу..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || 'All'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default function PagintaionWrapper() {
    return (
      <Suspense>
        <IssueStatusFilter />
      </Suspense>
    )
}
