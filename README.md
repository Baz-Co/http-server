# A REST-ish HTTP Server

A local development API to stint out Backend API interactions while developing a front-end Application.

When interacting with the "/item" endpoint, this HTTP Server creates a Map of objects of <strong>ANY</strong> shape on the REPO's local filesystem in a JSON file.

The Map is keyed by the "id" property of the object, or generates a random UUID, as the entry's "id", using the "Web Cypto API".

The "/items" API endpoint supports the "GET", "POST", "PUT", "DELETE" HTTP Methods.

## Technologies:

- Deno (TypeScript Run-time)
- Oak (HTTP Server) (Deno Third Party Module)

## Usage:

### Prerequisites:

- Install Deno onto your development environment: [https://deno.land/#installation](https://deno.land/#installation)
- Clone this REPO
- The server requires the following permissions: `--allow-env`, `--allow-net`, `--allow-read`, `--allow-write`

### Development:

- Re-name the `.env.sample` file to `.env` to set the PORT environment variable to ":8001", or whatever PORT number you'd like to use.
- Run the following command in the Terminal: `deno task start`
- The HTTP Server will be running on port 8001
- Check out the [`_note-cURL-commands.md`](./_note-cURL-commands.md) file for a list of cURL commands to interact with the API.

## Roadmap:

- [ ] Add common API Query String Parameters to the "/items" endpoint. (limit, offset, sort, etc.)
- [ ] Make server run as global command like [json-server](https://www.npmjs.com/package/json-server)

## Contributing:

MIT License, feel free to fork, update, file issues and PRs with this REPO. It was a learning exercise for me, and I hope a inspiration for an exploration for your own.

I have previously built a version of this server in Node.js following this [guide](https://dev.to/realsteveig/nodejs-and-typescript-tutorial-build-a-rest-api-with-typescript-nodejs-and-a-file-based-storage-system-2l61). I refactored into Deno by spending a fair amount of time with the [Deno docs](https://deno.land/manual@v1.35.0/examples/http_server) and following this [guide](https://www.robinwieruch.de/deno-oak-rest-api/).
