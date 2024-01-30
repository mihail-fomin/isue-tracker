import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '@/app/api/issueSchema'
import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  })

  return NextResponse.json({})
}
