const express = require('express')
const app = express()
const port = 3000

const database = require("./services/database")
const BookRouter = require("./routes/bookrouter")

app.use(express.json())
app.use("/api/bookstore", BookRouter)
database.connect();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})