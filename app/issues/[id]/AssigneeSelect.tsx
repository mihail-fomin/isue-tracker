'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Skeleton } from '@/app/components'
import toast from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton />
  if (error) return null

  const assignIssue = async (userId: string) => {
    try {
      await updateIssue(userId)
      toast.success(userId === 'unassigned' ? 'Привязка задачи снята' : 'Задача была привязана')
    } catch (error) {
      console.log('error: ', error)
      toast.error('Изменения не могут быть сохранены(')
    }
  }

  const updateIssue = async (userId: string) => {
    await axios.patch('/api/issues/' + issue.id, {
      assignedTo: userId === 'unassigned' ? null : userId,
    })
  }

  return (
    <Select.Root defaultValue={issue.userId || ''} onValueChange={assignIssue}>
      <Select.Trigger placeholder="Прикрепить..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Варианты</Select.Label>
          <Select.Item value="unassigned">Не привязано</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  })

export default AssigneeSelect
