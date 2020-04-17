const express = require('express')
const connection = require('./conf');
const app = express()
const port = 3000

app.get('/api/employees', (req, res) => {
  connection.query('SELECT * from employee', (err, results) => {
    if (err) {
        res.status(500).send('Erreur lors de la récupération des employés');
    } else {
        res.json(results);
    }
  });
});


app.listen(port, err => {
  if(err) {
    throw new Error('The connection to the page as failed')
  }
})
