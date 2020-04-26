const express = require('express')
const connection = require('./conf');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// Support JSON-encoded bodies
app.use(bodyParser.json())
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/api/employees', (req, res) => {
  connection.query('SELECT * from employee', (err, results) => {
    if (err) {
        res.status(500).send('Erreur lors de la récupération des employés')
    } else {
        res.json(results)
    }
  })
})

app.post('/api/employees', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO employee SET ?', formData, (err, results) => {

    if (err) {
      console.log(err, formData);
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/api/employees/:id', (req, res) => {
  const idEmployee = req.params.id
  const formData = req.body

  connection.query('UPDATE employee SET ? WHERE id=?', [formData, idEmployee], err => {
    if (err) {
      console.log(err)
      res.status(500).send("Erreur lors de la modification d'un employé")
    } else {
      res.sendStatus(200)
    }
  })
})

app.delete('/api/employees/:id', (req, res) => {
    const idEmployee = req.params.id

    connection.query('DELETE FROM employee WHERE id=?', [idEmployee], err => {
      if (err) {
        console.log(err)
        res.status(500).send("Erreur lors de la modification d'un employé")
      } else {
        res.sendStatus(200)
      }
    })
})


app.listen(port, err => {
  if(err) {
    throw new Error('The connection to the page as failed')
  }
})
