'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'

import React from 'react'

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
