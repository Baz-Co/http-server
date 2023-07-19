import * as dotenv from 'https://deno.land/std@0.193.0/dotenv/mod.ts'
import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";

import { Application, helpers, Router } from 'oak'

const env = await dotenv.load()
if (env.LOGGING) {
  console.log('ENV VARS: ' + JSON.stringify(await env, null, 2))
}

let items = new Map()
let file: string

try {
  file = await Deno.readTextFile('./DATA.json')
} catch (_e) {
  console.log('No \'DATA.json\' File Found, Creating...')
  await Deno.writeTextFile(
    './DATA.json',
    JSON.stringify(Array.from(items.entries()), null, 2),
  )
  file = await Deno.readTextFile('./DATA.json')
}
items = new Map(JSON.parse(file))

const router = new Router()
router
  .get('/', (context) => {
    context.response.body = 'Local HTTP REST-ish API'
    context.response.body += '\n'
  })
  .get('/item', (context) => {
    context.response.type = 'json'
    const { id } = helpers.getQuery(context, { mergeParams: true })
    if (id) {
      context.response.body = items.get(id)
    } else {
      const rb: unknown[] = []
      items.forEach((value) => {
        rb.push(value)
      })
      context.response.body = rb
    }
  })
  .get('/items', (context) => {
    context.response.type = 'json'
    const rb: unknown[] = []
    items.forEach((value) => {
      rb.push(value)
    })
    context.response.body = rb
  })
  .get('/item/:id', (context) => {
    context.response.type = 'json'
    const { id } = helpers.getQuery(context, { mergeParams: true })
    // const id = Number(context.params.id)

    if (items.has(id)) {
      context.response.body = items.get(id)
    }
  })
  .post('/item', async (context) => {
    const body = await context.request.body().value

    // const FourDigitIDGenerator = () => Math.floor(Math.random()*10000)
    let id = self.crypto.randomUUID()
    while (items.has(id)) {
      id = self.crypto.randomUUID()
    }
    items.set(id, { id: id, ...body, created: new Date() })
    await Deno.writeTextFile(
      './DATA.json',
      JSON.stringify(Array.from(items.entries()), null, 2),
    )
    context.response.body = items.get(id)
  })
  .put('/item', async (context) => {
    const { id } = helpers.getQuery(context, { mergeParams: true })
    const body = await context.request.body().value
    if (items.has(id)) {
      items.set(id, { ...items.get(id), ...body, updated: new Date() })
      await Deno.writeTextFile(
        './DATA.json',
        JSON.stringify(Array.from(items.entries()), null, 2),
      )
      context.response.body = items.get(id)
    }
  })
  .put('/item/:id', async (context) => {
    const { id } = helpers.getQuery(context, { mergeParams: true })
    const body = await context.request.body().value
    if (items.has(id)) {
      items.set(id, { ...items.get(id), ...body })
      await Deno.writeTextFile(
        './DATA.json',
        JSON.stringify(Array.from(items.entries()), null, 2),
      )
      context.response.body = items.get(id)
    }
  })
  .delete('/item', async (context) => {
    const { id } = helpers.getQuery(context, { mergeParams: true })
    if (items.has(id)) {
      items.delete(id)
      await Deno.writeTextFile(
        './DATA.json',
        JSON.stringify(Array.from(items.entries()), null, 2),
      )
      context.response.body = `ID:${id} deleted.`
    }
  })
  .delete('/item/:id', async (context) => {
    const { id } = helpers.getQuery(context, { mergeParams: true })
    if (items.has(id)) {
      items.delete(id)
      await Deno.writeTextFile(
        './DATA.json',
        JSON.stringify(Array.from(items.entries()), null, 2),
      )
      context.response.body = `ID:${id} deleted.`
    }
  })

const app = new Application()
if (env.LOGGING) {
  app.use((ctx, next) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    next();
  })
}
app.use(CORS({ origin: "*" }));
app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({ port: Number(env.PORT) })
