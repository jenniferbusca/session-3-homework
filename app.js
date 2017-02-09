const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
const port = 9000
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

MongoClient.connect('mongodb://jenniferbusca:mypassword123@ds147079.mlab.com:47079/bcl', (err, database) => {
   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})

// app.get('/', (req, res) => {
//   var cursor = db.collection('entries').find()
//   console.log(cursor)
//   res.sendFile(__dirname + '/index.html')
// })

// app.get('/', (req, res) => {
//   db.collection('entries').find().toArray((err, results) => {
//     console.log(results)
//     res.sendFile(__dirname + '/index.html')
//   })
// })

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/entry/:name?/:link?', function(req, res){
  let name = req.params.name
  let hashlink = `#${req.params.link}`
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${hashlink}
    `)
})

app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})