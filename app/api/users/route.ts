import prisma from '@/app/utils/connect'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(users)
}
