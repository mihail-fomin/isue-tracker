import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/connect'
import { issueSchema } from '../issueSchema'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import { informCreation } from '@/app/utils/telegram'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { title, description } = body

  const validation = issueSchema.safeParse(body)

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  })

  const id = newIssue.id
  informCreation(id, title, description)

  return NextResponse.json(newIssue, { status: 201 })
}
