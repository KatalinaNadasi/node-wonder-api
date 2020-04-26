require('babel-register')
const morgan = require('morgan')
const {success, error} = require('functions')
const express = require('express')
const app = express()
const port = 8080

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

const membersRouter = express.Router()

const getAll = (req, res, next) => {
  console.log("datas")
  req.message="ceci est un message depuis le premier middleware"
  next()
}

const getAllSuite = (req, res, next) => {
  console.log(req.message)
  next()
}

membersRouter.get('/', getAll, getAllSuite, (req, res) => {
  if (req.query.max != undefined && req.query.max > 0){
    res.json(success(members.slice(0, req.query.max)))
  } else if(req.query.max != undefined) {
    res.json(error('Wrong max value'))
  } else {
    res.json(success(members))
  }
  console.log('trois')
})

membersRouter.get('/:id', (req, res) => {
  res.json(success(members[(req.params.id) - 1].name));
})

membersRouter.post('/', (req, res) => {
  const lastItem = members[members.length - 1];
  const lastId = lastItem.id;
  const member = {
    id: lastId + 1,
    name: req.body.name
  }
  members.push(member)
  res.json(success(member))
})

membersRouter.put('/:id', (req, res) => {
  const member = members.find(member => member.id === parseInt(req.params.id))
  member.name = req.body.name
  res.send(member)
})

membersRouter.delete('/:id', (req,res) => {
  const member = members.find(element => element.id === parseInt(req.params.id))
  const index = members.indexOf(member)
  members.splice(index, 1)
  res.send(member)
})

app.use('/api/members/', membersRouter)

app.listen(8080, () => console.log(`Started on port ${port}`));
