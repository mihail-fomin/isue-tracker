import authOptions from '@/app/auth/authOptions'
import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const deletedComment = await prisma.comment.delete({
    where: { id: params.id },
  })

  return NextResponse.json(deletedComment, { status: 202 })
}
