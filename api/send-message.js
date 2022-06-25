export default function handler(request, response) {
  const { username, password } = process.env

  response.status(200).json({
    success: true,
    message: 'Hello world!',
    username,
    password,
    request
  })
}
