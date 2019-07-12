const typeorm = require('typeorm'),      
      app = require('./app'),
      port = process.env.PORT || 3001,
      configDB = require('./dbConfig');


//console.log(configDB)
typeorm.createConnection(
  configDB.test
).then( async (connection) => {
  if(!connection){
    console.log("On");
  }
  console.log(`La conexión a la base de datos se ha realizado... `);

  app.listen(port, () => {
    console.log(`El servidor esta corriendo en http://localhost:${port}...`);
  });
}).catch(err => console.log(`Error example:  ${err}`));