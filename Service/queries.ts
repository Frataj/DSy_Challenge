const Pool = require('pg').Pool
const pool = new Pool({
  host: 'db-dsy', // localhost if not dockerized
  port: 5432, // 5439 for localhost (if not dockerized)
  database: 'test_db',
  user: 'root',
  password: 'root'
})


const getChat = (request, response) => {
  pool.query('SELECT * FROM testtable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
};

const createChatEntry = (request, response) => {
  console.log(request.body);
  const { text, title, username } = request.body
    pool.query('INSERT INTO testtable (text, title, username) VALUES ($1, $2, $3) RETURNING *', [text, title, username], (error, results) => {
      if (error) {
        console.log("first statement.")
        throw error
      }
      pool.query('SELECT * FROM testtable', (error, results) => {
        if (error) {
        console.log("second statement.")
          throw error
        }
        response.status(200).json(results.rows);
      });
    })
  };

const clearChat = (request, response) => {
  pool.query('DELETE FROM testtable', (error, results) => {
    if (error) {
      throw error
    }
    pool.query('SELECT * FROM testtable', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    });
  })
}

module.exports = { 
    getChat,
    createChatEntry,
    clearChat
}