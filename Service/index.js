import { getChat, createChatEntry, clearChat, checkHealth } from "./queries.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

console.log("==================");
const app = express()
const port = process.env.PORT || 3033

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  });
app.get('/get', getChat);
app.get('/health', checkHealth);
app.post('/post', createChatEntry);
app.delete('/delete', clearChat);

app.listen(port, () => {
  console.log(`App running on port ${port}. Waiting for input.`)
  console.log(`CORS enabled on all inputs`)
})