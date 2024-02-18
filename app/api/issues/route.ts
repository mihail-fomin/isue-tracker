import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/connect'
import { issueSchema } from '../issueSchema'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import TelegramBot from 'node-telegram-bot-api'

const telegramToken = process.env.TG_TOKEN
const chatId = '-1002016925780'

let bot: TelegramBot

if (telegramToken) {
  bot = new TelegramBot(telegramToken, { polling: true })
}

const informCreation = (title: string, description: string) => {
  const message = `
  <strong>Новая задача:</strong> ${title}
  <b>Описание задачи:</b> ${description}
  `

  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
}

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

  informCreation(title, description)

  return NextResponse.json(newIssue, { status: 201 })
}
