import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/connect'
import { issueSchema } from '../issueSchema'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import TelegramBot from 'node-telegram-bot-api'

const telegramToken = process.env.TG_TOKEN
const bot = new TelegramBot(telegramToken, { polling: true })
const chatId = '-4157860383'


export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('body: ', body);

  const {
    title,
    description
  } = body

  const validation = issueSchema.safeParse(body)

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  })
  
  const message = `
    <strong>Новая задача:</strong> ${title}
    <b>Описание задачи:</b> ${description}
    `

  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })


  return NextResponse.json(newIssue, { status: 201 })
}
