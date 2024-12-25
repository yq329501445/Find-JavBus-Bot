import { BOT_TOKEN, WEBHOOK_PATH } from './config'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // 记录请求信息
    console.log('Received request:', request.method, request.url)

    if (request.method === 'POST' && request.url.includes(WEBHOOK_PATH)) {
      const payload = await request.json()
      console.log('Webhook payload:', JSON.stringify(payload))

      if (payload.message) {
        const chatId = payload.message.chat.id
        const text = payload.message.text || ''
        console.log('Processing message:', text, 'from chat:', chatId)

        // 发送消息
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: '收到消息：' + text
          })
        })

        const result = await response.json()
        console.log('Telegram API response:', JSON.stringify(result))
      }

      return new Response('OK', {
        headers: { 'content-type': 'text/plain' },
      })
    }

    // 返回带有时间戳的响应
    return new Response(`Bot is running! Timestamp: ${new Date().toISOString()}`, {
      headers: { 'content-type': 'text/plain' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
