import authOptions from '@/app/auth/authOptions'
import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { content, userId, issueId } = body

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const newComment = await prisma.comment.create({
    data: { content, userId, issueId },
  })

  console.log('newComment: ', newComment)

  return NextResponse.json(newComment, { status: 201 })
}
