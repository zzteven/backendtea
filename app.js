const express = require("express")

const app = express()

const settingsRouter = require("./router/settings.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(settingsRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});