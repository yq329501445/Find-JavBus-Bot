addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const ALLOWED_GROUPS = []
const BOT_TOKEN = '7902050960:AAHbzct5IOmieS1RRqq5naOSbjQLYLygRmE'
const ROBOT_NAME = '@avmenubot'

async function handleRequest(request) {
  // 你的代码逻辑
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

export {
  ALLOWED_GROUPS,
  BOT_TOKEN,
  ROBOT_NAME
}
