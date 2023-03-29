import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DBHOST || 'localhost', // localhost if not dockerized
  port: process.env.DBPORT || 5439, // 5439 for localhost (if not dockerized)
  database: 'test_db',
  user: 'root',
  password: 'root'
})


export const getChat = (request, response) => {
  pool.query('SELECT * FROM testtable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
};

export const createChatEntry = (request, response) => {
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

export const clearChat = (request, response) => {
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
