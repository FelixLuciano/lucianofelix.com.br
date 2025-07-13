import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verify } from 'hcaptcha'

import { authenticate, pushMessage } from './send-message'


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
