const mysql = require('mysql');

const  connection = mysql.createConnection({
debug: true,
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  '', // le mot de passe
database :  'employee_table_structure', // le nom de la base de données
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
module.exports = connection;
