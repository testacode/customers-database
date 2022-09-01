const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// sqlite
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('/data/customer.db')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hit', (req, res) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS hits (hit TEXT)')
    const stmt = db.run('INSERT INTO hits VALUES (?)', ['hit'])

    db.get('SELECT COUNT(*) FROM hits', (err, row) => {
      console.log('count row: ', row, err)
      res.send(row)
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
