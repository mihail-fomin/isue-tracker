import TelegramBot from 'node-telegram-bot-api'

const telegramToken = process.env.TG_TOKEN
const chatId = '-1002016925780'

const URI = 'https://isue-tracker.vercel.app/'

interface MessageFields {
  id: string
  newIssueTitle: string
  oldIssueTitle: string
  description?: string
  status?: string
  userName?: string | null
}

let bot: TelegramBot

if (telegramToken) {
  bot = new TelegramBot(telegramToken, { polling: true })
}

export const informCreation = async (id: string, title: string, description: string) => {
  try {
    let message = `
    <strong>Новая задача:</strong> ${title}
    <b>Описание задачи:</b> ${description}
    `
    message += `
    Посмотреть задачу: ${URI}issues/${id}
    `

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error(error)
  }
}

export const informEdition = async ({
  id,
  newIssueTitle,
  oldIssueTitle,
  description,
  status,
  userName,
}: MessageFields) => {
  try {
    let message = `
    <strong>Обновлена задача:</strong> ${oldIssueTitle}
    `
    if (newIssueTitle) {
      console.log('oldIssueTitle: ', oldIssueTitle)
      console.log('newIssueTitle: ', newIssueTitle)
      message += `
      <b>Новое название задачи:</b> ${newIssueTitle}
      `
    }
    if (description)
      message += `
    <b>Описание задачи:</b> ${description}
    `
    if (status)
      message += `
    <b>Статус задачи:</b> ${status}
    `
    if (userName)
      message += `
    <b>Закреплено за:</b> ${userName}
    `

    message += `
    Посмотреть задачу: ${URI}issues/${id}
    `

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error(error)
  }
}

export const informDeletion = async (issueTitle: string) => {
  try {
    const message = `<strong>Удалена задача:</strong> ${issueTitle}`

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error(error)
  }
}
