'use client'

import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { Skeleton } from '@/app/components'
import { useSession } from 'next-auth/react'

interface Container {
  label: string
  value: Status
}

const statuses: Container[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In-progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]


const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter()

  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton />

  const assignStatus = (status: Status) => {
    try {
      axios.patch('/api/issues/' + issue.id, {
        status,
      })
      router.refresh()
      toast.success('Issue status has been changed')
    } catch (error) {
      console.log('error: ', error)
      toast.error('Status could not be saved')
    }
  }

  return (
    <Select.Root defaultValue={issue.status} onValueChange={assignStatus}>
      <Select.Trigger placeholder="Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {statuses?.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default StatusSelect