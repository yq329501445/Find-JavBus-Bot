addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const ALLOWED_GROUPS = []
const BOT_TOKEN = '7902050960:AAHbzct5IOmieS1RRqq5naOSbjQLYLygRmE'
const ROBOT_NAME = '@avmenubot'

async function handleRequest(request) {
  // 返回一个简单的响应，确认Workers正在运行
  return new Response('Bot is running!', {
    headers: { 'content-type': 'text/plain' },
  })
}

export {
  ALLOWED_GROUPS,
  BOT_TOKEN,
  ROBOT_NAME
}
