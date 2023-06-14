export const runtime = 'edge'

export async function GET(request: Request) {
  const body = JSON.stringify({
    success: true,
    message: 'Hello World!'
  })

  return new Response(body, {
    status: 200,
    statusText: 'OK'
  })
}
