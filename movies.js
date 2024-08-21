const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const dbPath = path.join(__dirname, 'moviesData.db')
let db = null
const initializeTheServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running Successfully at https://localhost:3000/')
    })
  } catch (e) {
    console.log(`Caught an error ${e.Message}`)
  }
}
initializeTheServer()

const convertToCamelCase = movie_id => {
  return {
    movieName: movie_id,
  }
}
//API GET METHOD
app.get('/movies/', async (request, response) => {
  let databaseCommand = `SELECT movie_name FROM 
        movie`
  const movieNameArray = await db.all(databaseCommand)
  response.send(
    movieNameArray.map(eachName => {
      convertToCamelCase(eachName.movie_id)
    }),
  )
})
module.exports = app
