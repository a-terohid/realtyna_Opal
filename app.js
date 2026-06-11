const next = require("next")
const cron = require("node-cron")
const { createServer } = require("http")
const { parse } = require("url")
const { exec } = require("child_process")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3010
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === "/a") {
        await app.render(req, res, "/a", query)
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("internal server error")
    }
  })
    .once("error", (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})

// Cron job to run the bash script every 12 hours
cron.schedule("0 */12 * * *", () => {
  console.log("Running daily cache cleanup script...")

  exec("bash ./files/cleanup-cache.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`)
      return
    }
    console.log(`Script output: ${stdout}`)
  })
})
