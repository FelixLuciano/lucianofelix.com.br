import { google } from 'googleapis'
import { verify } from 'hcaptcha'


const sheets = google.sheets('v4')
const sheetId = '1oWWT-Fw0FQJdGO3VbtDFh3x_Uvid7bNuptGNWQkxZXM'
const range = 'Messages'
const { secret, google_credentials } = process.env

async function authenticate () {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ],
    credentials: JSON.parse(google_credentials),
  })
  const authClient = await auth.getClient()

  google.options({ auth: authClient })
}

export default async function handler(request, response) {
  try {
    const { contact, message, token } = request.body
    const { success } = await verify(secret, token)

    if (!success) {
      response.status(400).json({
        success: false,
        message: 'Invalid captcha!'
      })
    }
    else {
      await authenticate()

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          range: range,
          majorDimension: 'ROWS',
          values: [
            [
              new Date().toLocaleString('pt-BR'),
              contact,
              message
            ]
          ]
        }
      })

      response.status(200).json({
        success: true,
        message: 'Success!'
      })
    }
  }
  catch {
    response.status(500).json({
      success: false,
      message: 'Something went wrong :('
    })
  }
}
