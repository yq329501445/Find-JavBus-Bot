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

    // 返回详细的状态信息
    return new Response(JSON.stringify({
      status: 'ok',
      message: 'Bot is running',
      timestamp: new Date().toISOString(),
      request: {
        url: request.url,
        method: request.method
      }
    }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    // 错误处理
    console.error('Error:', error)
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}
