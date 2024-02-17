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
      toast.success(userId === 'unassigned' ? 'Issue has unassigned' : 'Issue has been assigned to User')
      } catch (error) {
      console.log('error: ', error)
      toast.error('Changes could not be saved')
    }
  }

  const updateIssue = async (userId: string) => {
    await axios.patch('/api/issues/' + issue.id, {
      assignedTo: userId === 'unassigned' ? null : userId,
    })
  }

  return (
    <Select.Root defaultValue={issue.userId || ''} onValueChange={assignIssue}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
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
