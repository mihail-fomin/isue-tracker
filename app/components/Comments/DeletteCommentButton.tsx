'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import Spinner from '../Spinner'

const RemoveButton = ({ commentId }: { commentId: string }) => {
  const router = useRouter()
  // const [error, setError] = React.useState<boolean>(false)
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

  const handleDeleteButton = async () => {
    try {
      setIsDeleting(true)
      await axios.delete('/api/comments/' + commentId)
      toast.success('Комментарий был удален')
      router.refresh()
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
      // setError(true)
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <button
      className="flex justify-center items-center w-10 h-10 rounded-full transition hover:bg-slate-200"
      onClick={handleDeleteButton}
    >
      {isDeleting ? <Spinner /> : <AiFillDelete />}
    </button>
  )
}

export default RemoveButton
