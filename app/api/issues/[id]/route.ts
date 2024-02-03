import { NextRequest, NextResponse } from 'next/server'
import { patchIssueSchema } from '@/app/api/issueSchema'
import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const { assignedTo, title, description } = body

  if (assignedTo) {
    const user = await prisma.user.findUnique({
      where: { id: assignedTo },
    })
    if (!user) {
      return NextResponse.json(
        { error: "Invalid user." },
        { status: 400 }
      )
    }
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
      title,
      description,
      assignedTo: assignedTo
        ? {
            connect: {
              id: assignedTo,
            },
          }
        : undefined, // Set to undefined if you want to unassign the issue
    },
  });


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
