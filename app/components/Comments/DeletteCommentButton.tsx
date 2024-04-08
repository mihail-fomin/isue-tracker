'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import Spinner from '../Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const RemoveButton = ({ commentId }: { commentId: string }) => {
  const router = useRouter()
  // const [error, setError] = React.useState<boolean>(false)
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

  const handleDeleteButton = async () => {
    try {
      await axios.delete('/api/comments/' + commentId)
      toast.success('Комментарий был удален')
      router.refresh()
      setIsDeleting(false)
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
      // setError(true)
    }
  }
  return (
    <>
      <button
        className="flex justify-center items-center w-10 h-10 rounded-full transition hover:bg-slate-200"
        onClick={() => setIsDeleting(true)}
      >
        {isDeleting ? <Spinner /> : <AiFillDelete />}
      </button>
      <AlertDialog.Root open={isDeleting}>
        <AlertDialog.Content>
          <AlertDialog.Title>Подтвердить удаление</AlertDialog.Title>
          <AlertDialog.Description>Вы уверены что хотите удалить комментарий?</AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={() => setIsDeleting(false)}>
                Отменить
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDeleteButton} className="delete-btn">
                Удалить комментарий
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default RemoveButton
