'use client'

import React from 'react'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Spinner } from '@/app/components'

const DeleteIssueButton = ({ issueId }: { issueId: string}) => {
  const router = useRouter()
  const [error, setError] = React.useState<boolean>(false)
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

  const handleDeleteButton = async () => {
    try {
      setIsDeleting(true)
      await axios.delete('/api/issues/' + issueId)
      toast.success('Issue has been deleted')
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}>
          Delete Issue
          {isDeleting && <Spinner />}
        </Button>
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
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This issue could not be deleted.
        </AlertDialog.Description>
        <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>
          OK
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton