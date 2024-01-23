'use client'

import React from 'react'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DeleteIssueButton = ({ issueId }: { issueId: string}) => {
  const router = useRouter()

  const handleDeleteButton = async () => {
    await axios.delete('/api/issues/' + issueId)
    router.push('/issues')
    router.refresh()
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'
              onClick={handleDeleteButton}
            >Delete Issue</Button>
          </AlertDialog.Action>
        </Flex> 
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton