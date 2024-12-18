'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

import { AlertDialog, Button, TextArea } from '@radix-ui/themes'
import Spinner from '../Spinner'
import { Issue } from '@prisma/client'

interface Props {
  issue: Issue
  userId?: string
}

const CommentField = ({ issue, userId }: Props) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const issueId = issue.id

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = handleSubmit(async (comment) => {
    const content = comment.content
    try {
      const data = {
        content,
        issueId,
        userId,
      }
      setSubmitting(true)

      await axios.post('/api/comments/', data)
      toast.success('Комментарий был опубликован')
      router.refresh()
      reset()
    } catch (error) {
      setSubmitting(false)
      setError(true)
      toast.error('Комментарий не может быть опубликован')
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <>
      <form className="space-y-3 max-w-xl" onSubmit={onSubmit}>
        <TextArea placeholder='Ваш комментарий' {...register('content')} />
        <Button disabled={isSubmitting}>
          {'Опубликовать комментарий'} {isSubmitting && <Spinner />}
        </Button>
      </form>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Ошибка</AlertDialog.Title>
          <AlertDialog.Description>Комментарий не может быть опубликован.</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default CommentField
