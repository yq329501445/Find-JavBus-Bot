addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const ALLOWED_GROUPS = []
const BOT_TOKEN = '7902050960:AAHbzct5IOmieS1RRqq5naOSbjQLYLygRmE'
const ROBOT_NAME = '@avmenubot'

async function handleRequest(request) {
  // 检查请求方法和路径
  const url = new URL(request.url)

  // 如果是webhook路径
  if (request.method === 'POST' && url.pathname === '/webhook') {
    const payload = await request.json()

    if (payload.message) {
      const chatId = payload.message.chat.id
      const text = payload.message.text || ''

      // 发送测试消息
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: '收到消息：' + text
        })
      })
    }

    return new Response('OK', {
      headers: { 'content-type': 'text/plain' },
    })
  }

  // 其他路径返回默认响应
  return new Response('Bot is running!', {
    headers: { 'content-type': 'text/plain' },
  })
}

export {
  ALLOWED_GROUPS,
  BOT_TOKEN,
  ROBOT_NAME
}
