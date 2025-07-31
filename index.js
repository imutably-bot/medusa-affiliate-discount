const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")

// Import from @medusajs/framework instead of @medusajs/medusa for Medusa v2
const { createMedusaContainer } = require("@medusajs/framework")

;(async() => {
  async function start() {
    const app = express()
    const directory = process.cwd()

    try {
      // Use createMedusaContainer from @medusajs/framework for Medusa v2
      const { container } = await createMedusaContainer({
        directory,
        expressApp: app
      })
      
      const configModule = container.resolve("configModule")
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

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
