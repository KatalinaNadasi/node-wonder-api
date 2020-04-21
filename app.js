require('babel-register')
const morgan = require('morgan')
const {success, error} = require('functions')
const express = require('express')
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET, POST, UPDATE, DELETE METHODS WITH A HARD CODE DATABASE

const members = [
  {
    id: 1,
    name: "Katalina"
  },
  {
    id: 2,
    name: "Thomas"
  },
];

app.get('/api/members', (req, res) => {
  if (req.query.max != undefined && req.query.max > 0){
    res.json(success(members.slice(0, req.query.max)))
  } else if(req.query.max != undefined) {
    res.json(error('Wrong max value'))
  } else {
    res.json(success(members))
  }
})

app.get('/api/members/:id', (req, res) => {
  res.json(success(members[(req.params.id) - 1].name));
})

app.post('/api/members/', (req, res) => {
  // const lastItem = members[members.length - 1];
  // const lastId = lastItem.id;
  const member = {
    id: members.length + 1,
    name: req.body.name
  }
  members.push(member)
  res.json(success(member))
})

app.put('/api/members/:id', (req, res) => {
  const member = members.find(member => member.id === parseInt(req.params.id))
  member.name = req.body.name
  res.send(member)
})

app.listen(8080, () => console.log('Started on port 8080'));
