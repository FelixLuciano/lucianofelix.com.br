import { verify } from 'hcaptcha'
import { createTransport } from 'nodemailer'


const { secret, username, password, inbox } = process.env

const mailer = createTransport(
  {
    service: "gmail",
    auth: {
      username,
      password
    }
  },{
    from: `LucianoFelix.com.br <${username}>`,
    to: inbox,
    subject: "New message",
  }
)

export default function handler(request, response) {
  try {
    const { contact, message, token } = request.body
    const { success } = await verify(secret, token)

    if (success) {
      const mail = {
        text: `Conact: ${contact}\nMessage:\n${message}`
      }

      await mailer.sendMail(mail)

      response.status(200).json({
        success: true,
        message: 'Message sent successfully! I will reply as soon as possible.'
      })
    } else {
      response.status(400).json({
        success: true,
        message: 'Invalid captcha!'
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
