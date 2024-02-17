import { NextRequest, NextResponse } from 'next/server'
import { patchIssueSchema } from '@/app/api/issueSchema'
import prisma from '@/app/utils/connect'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import TelegramBot from 'node-telegram-bot-api'

const telegramToken = process.env.TG_TOKEN
const chatId = '-1002016925780'

let bot: TelegramBot

if (telegramToken) {
  bot = new TelegramBot(telegramToken, { polling: true })
}

interface MessageFields {
  issueTitle: string
  description?: string
  status?: string
  userName?: string | null
}

const informEdition = async ({ issueTitle, description, status, userName }: MessageFields) => {
  try {
    let message = `
    <strong>Обновлена задача:</strong> ${issueTitle}
    `
    if (description) message += `<b>Описание задачи:</b> ${description}`
    if (status) message += `<b>Статус задачи:</b> ${status}`
    if (userName) message += `<b>Закреплено за:</b> ${userName}`

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const { assignedTo, title, description, status } = body

  let userName
  let issueTitle

  if (assignedTo) {
    const user = await prisma.user.findUnique({
      where: { id: assignedTo },
    })

    userName = user?.name

    if (!user) {
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 })
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
  }

  issueTitle = issue.title

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      status,
      assignedTo: assignedTo
        ? {
            connect: {
              id: assignedTo,
            },
          }
        : undefined, // Set to undefined if you want to unassign the issue
    },
  })

  informEdition({ issueTitle, description, status, userName })
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
