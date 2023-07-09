let items = new Map()
let file: string

try {
  file = await Deno.readTextFile('./_example-Map-to-JSON-file.json')
} catch (_e) {
  console.log('No Data File Found, Creating...')
  await Deno.writeTextFile(
    './_example-Map-to-JSON-file.json',
    JSON.stringify(Array.from(items.entries()), null, 2),
  )
  file = await Deno.readTextFile('./_example-Map-to-JSON-file.json')
}
items = new Map(JSON.parse(file))

items.set('e31c4c44-734f-4d73-8830-6e8df0397f7b', {
  id: 'e31c4c44-734f-4d73-8830-6e8df0397f7b',
  name: 'Wrist watch',
  price: 500,
  quantity: 50,
  image: 'image_url.png',
})

await Deno.writeTextFile(
  './_example-Map-to-JSON-file.json',
  JSON.stringify(Array.from(items.entries()), null, 2),
)
console.log(
  '\'items\' Map Object: ' +
    JSON.stringify(Array.from(items.entries()), null, 2),
)

const itemsArray: unknown[] = []
items.forEach((value) => {
  itemsArray.push(value)
})
console.log('Array of \'items\': ' + JSON.stringify(itemsArray, null, 2))
