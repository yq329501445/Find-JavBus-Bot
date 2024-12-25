addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const BOT_TOKEN = '7902050960:AAHbzct5IOmieS1RRqq5naOSbjQLYLygRmE'
const WEBHOOK_PATH = '/webhook'
const ROBOT_NAME = '@avmenubot'
const ALLOWED_GROUPS = []

async function handleRequest(request) {
  try {
    // 记录请求信息
    console.log('Request received:', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers)
    })

    // 处理webhook请求
    if (request.method === 'POST' && new URL(request.url).pathname === WEBHOOK_PATH) {
      const payload = await request.json()
      console.log('Webhook payload:', JSON.stringify(payload))

      if (payload.message) {
        const chatId = payload.message.chat.id
        const text = payload.message.text || ''
        console.log('Processing message:', text, 'from chat:', chatId)

        // 发送测试消息
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: '你好！我收到了你的消息：' + text,
            parse_mode: 'HTML'
          })
        })

        const result = await response.json()
        console.log('Telegram API response:', JSON.stringify(result))
      }

      return new Response('OK', {
        headers: { 'content-type': 'text/plain' },
      })
    }

    // 返回基本响应
    return new Response('Bot is running!', {
      headers: { 'content-type': 'text/plain' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
