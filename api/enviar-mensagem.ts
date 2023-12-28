import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'
import { verify } from 'hcaptcha'

import { authenticate, pushMessage } from './send-message'

const sheets = google.sheets('v4')

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const token = request.body['h-captcha-response']
    const { success } = await verify(process.env.hcaptcha_secret, token)

    if (!success)
      return response.json({
        success: false,
        message: 'Captcha inválido!',
      })

    await authenticate()
    await pushMessage(request.body.contact, request.body.message)

    return response.json({
      success: true,
      message: 'Mensagem enviada!',
    })
  }
  catch (error) {
    console.error('Error:', error)

    return response.json({
      success: false,
      message: 'Algo deu errado! Tente mais tarde.',
    })
  }
}
