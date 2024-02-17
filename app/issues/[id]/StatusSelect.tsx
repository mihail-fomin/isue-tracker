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
  { label: 'Отрыто', value: 'OPEN' },
  { label: 'В работе', value: 'IN_PROGRESS' },
  { label: 'Закрыто', value: 'CLOSED' },
]

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter()

  const { status } = useSession()

  if (status === 'loading') return <Skeleton />

  const assignStatus = async (status: Status) => {
    try {
      await axios.patch('/api/issues/' + issue.id, {
        status,
      })
      router.refresh()
      toast.success('Статус задачи обновлен')
    } catch (error) {
      console.log('error: ', error)
      toast.error('Статус задачи не может быть обновлен')
    }
  }

  return (
    <Select.Root defaultValue={issue.status} onValueChange={assignStatus}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Варианты</Select.Label>
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
