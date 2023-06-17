import mailchannelsPlugin from '@cloudflare/pages-plugin-mailchannels'


export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: 'Luciano Felix', email: 'contato@lucianofelix.com.br' }],
    },
  ],
  from: { name: 'No Reply', email: 'no-reply@lucianofelix.com.br' },
  respondWith: () => new Response(null, {
    status: 302,
    headers: { Location: '/success' },
  }),
})
