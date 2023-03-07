const db = require('./queries.ts')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3033

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  });
app.get('/get', db.getChat);
app.post('/post', db.createChatEntry);
app.delete('/delete', db.clearChat);

app.listen(port, () => {
  console.log(`App running on port ${port}. Waiting for input.`)
})