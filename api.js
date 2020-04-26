const express = require('express')
const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// Afficher une liste de super héros
// Ajouter dans cette liste des super-héros
// Updater les héros dans cette liste
// Supprimer des héros dans cette liste


const superheros = [
  {id: 1, name: 'Wonderwoman'},
  {id: 2, name: 'Batman'},
  {id: 3, name: 'Spider man'},
]
app.get('/api/superheros', (req, res) => {
  res.send(superheros)
})

app.get('/api/superheros/:id', (req, res) => {
  const superhero = superheros.find(e => e.id === parseInt(req.params.id))
  res.send(superhero)
})

// Methode que j'aime moins
// app.get('/api/superheros/:id', (req, res) => {
//     const superhero = superheros[req.params.id - 1]
//     res.send(superhero)
// })

app.post('/api/superheros/', (req, res) => {
  const lastItem = superheros[superheros.length - 1]
  const lastId = lastItem.id

  const superhero = {
    id: lastId + 1,
    name: req.body.name,
  }
  superheros.push(superhero)
  res.send(superhero)
})

app.put('/api/superheros/:id', (req, res) => {
  const superhero = superheros.find(e => e.id === parseInt(req.params.id))
  superhero.name = req.body.name
  res.send(superhero)
})

app.delete('/api/superheros/:id', (req, res) => {
  const superhero = superheros.find(superhero => superhero.id === parseInt(req.params.id))
  const index = superheros.indexOf(superhero)
  superheros.splice(index, 1)
  res.send(superhero)
})

app.listen(port, () => console.log`serveur is running on ${port}`)
