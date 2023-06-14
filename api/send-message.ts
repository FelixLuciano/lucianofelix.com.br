import { google } from 'googleapis'
import { verify } from 'hcaptcha'


const sheets = google.sheets('v4')

async function authenticate() {
  const credentials = JSON.parse(process.env.google_credentials)

  google.options({
    auth: await new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }).getClient(),
  })
}

function createResponse(statusCode: number, success: boolean, body: object) {
  return new Response(JSON.stringify({ success, ...body }), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: statusCode,
  })
}

function pushMessage(contact: string, message: string) {
  return sheets.spreadsheets.values.append({
    spreadsheetId: '1oWWT-Fw0FQJdGO3VbtDFh3x_Uvid7bNuptGNWQkxZXM',
    range: 'Messages',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      range: 'Messages',
      majorDimension: 'ROWS',
      values: [
        [
          new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          }),
          contact,
          message,
        ],
      ],
    },
  })
}

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const { contact, message, token } = await request.json()
    const { success } = await verify(process.env.hcaptcha_secret, token)

    if (!success)
      return createResponse(400, false, {
        message: 'Invalid captcha!',
      })

    await authenticate()
    await pushMessage(contact, message)
  }
  catch {
    return createResponse(500, false, {
      message: 'Something went wrong! Try again later.',
    })
  }
  
  return createResponse(200, true, {
    message: 'Message sent successfully!',
  })
}
