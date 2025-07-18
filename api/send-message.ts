import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'
import { verify } from 'hcaptcha'


const sheets = google.sheets('v4')

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const token = request.body['h-captcha-response']
    const hcaptchaSecret = process.env.hcaptcha_secret
    if (!hcaptchaSecret) {
      throw new Error('hcaptcha_secret environment variable is not set')
    }
    const { success } = await verify(hcaptchaSecret, token)

    if (!success)
      return response.json({
        success: false,
        message: 'Invalid captcha!',
      })

    await authenticate()
    await pushMessage(request.body.contact, request.body.message)

    return response.json({
      success: true,
      message: 'Message sent successfully!',
    })
  }
  catch (error) {
    console.error('Error:', error)

    return response.json({
      success: false,
      message: 'Something went wrong! Try again later.',
    })
  }
}

export async function authenticate() {
  const credentials = JSON.parse(process.env.google_credentials)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })

  google.options({ auth })
}

export function pushMessage(contact: string, message: string) {
  const now = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })

  return sheets.spreadsheets.values.append({
    spreadsheetId: '1oWWT-Fw0FQJdGO3VbtDFh3x_Uvid7bNuptGNWQkxZXM',
    range: 'Messages',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      range: 'Messages',
      majorDimension: 'ROWS',
      values: [
        [now, contact, message],
      ],
    },
  })
}
