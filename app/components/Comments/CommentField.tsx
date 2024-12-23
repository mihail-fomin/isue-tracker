'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

import { AlertDialog, Button, TextArea } from '@radix-ui/themes'
import Spinner from '../Spinner'
import { Comment, Issue } from '@prisma/client'

interface Props {
  issue: Issue
  userId: string
  onAddComment: (newComment: Comment) => void
}

const CommentForm = ({ issue, userId, onAddComment }: Props) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const issueId = issue.id

  const { register } = useForm()

  const formAction = async(formData: FormData) => {
    const content = formData.get('content')?.toString() || ''

    const newComment = {
      id: `temp-comment-${Date.now()}`,
      content,
      issueId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  
    try {
      setSubmitting(true)

      onAddComment(newComment)

      const data = {
        content,
        issueId,
        userId,
      }
  
      await axios.post('/api/comments/', data)
      toast.success('Комментарий был опубликован')
      formRef.current?.reset() // Сброс формы
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setError(true)
      toast.error('Комментарий не может быть опубликован')
    } finally {
      setSubmitting(false)
    }
  }
  

  return (
    <>
      <form
        data-name="comment-field"
        className="space-y-3"
        ref={formRef}
        action={formAction}
      >
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

export default CommentForm
