require('babel-register')
const morgan = require('morgan')
const {success, error} = require('functions')
const express = require('express')
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const members = [
  {
    id: 1,
    name: "Katalina"
  },
  {
    id: 2,
    name: "Thomas"
  },
  {
    id: 3,
    name: "Zachary"
  }
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
  res.json(sucess(members[(req.params.id) - 1].name))
})


app.listen(8080, () => console.log('Started on port 8080'));
