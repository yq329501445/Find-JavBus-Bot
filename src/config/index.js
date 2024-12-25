addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const BOT_TOKEN = '7902050960:AAHbzct5IOmieS1RRqq5naOSbjQLYLygRmE'
const WEBHOOK_PATH = '/webhook'
const ROBOT_NAME = '@avmenubot'
const ALLOWED_GROUPS = []

async function handleRequest(request) {
  // 记录请求信息
  console.log('Request URL:', request.url)
  console.log('Request method:', request.method)

  // 返回基本响应
  return new Response('Hello from Workers!', {
    headers: {
      'content-type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
