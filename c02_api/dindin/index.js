const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');
db.all('SELECT * FROM recipes', (err, results) => {
  if (err) {
    throw err;
  }
  for (let i = 0; i < results.length; ++i) {
    console.log(results[i].name);
  }
});
db.all('SELECT * FROM recipes WHERE cuisine = ?', ['American'], (err, results) => {
  if (err) {
    throw err;
  }
  for (let i = 0; i < results.length; ++i) {
    console.log(results[i].name);
  }
});