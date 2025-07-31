// This file is only used for development purposes
// In production, the plugin will be loaded by the Medusa application

const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")

// For standalone plugin development, we don't need to initialize a full Medusa application
// This is just a simple Express server to test the plugin
;(async() => {
  async function start() {
    const app = express()
    const port = process.env.PORT ?? 9000

    app.get("/", (req, res) => {
      res.json({
        status: "ok",
        message: "Medusa Affiliate Discount Plugin is ready to be integrated into a Medusa application",
        note: "This is a development server only. In production, this plugin should be loaded by a Medusa application."
      })
    })

    try {

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return
          }
          console.log(`Server is ready on port: ${port}`)
        })
      )

      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.")
            process.exit(0)
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e)
            process.exit(1)
          })
      }
      process.on("SIGTERM", gracefulShutDown)
      process.on("SIGINT", gracefulShutDown)
    } catch (err) {
      console.error("Error starting server", err)
      process.exit(1)
    }
  }

  await start()
})()
