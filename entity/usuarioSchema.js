const EntitySchema = require('typeorm').EntitySchema;
  
module.exports = new EntitySchema({
  name: 'USUARIOS',
  tableName: 'USUARIOS',
  //target: USUARIOS,
  columns: {    
    USERID: {
      primary: true,
      type: 'number'
      //generated: true
    },
    USERNAME: {
      type: 'varchar2',
      length: 100
    },
    EMAIL: {
      type: 'varchar2',
      length: 200
    },
    PASSWORD: {
      type: 'varchar2',
      length: 100
    },
    FIRSTNAME: {
      type: 'varchar2',
      length: 100
    },
    LASTNAME: {
      type: 'varchar2',
      length: 100
    },
    STATUS: {
      type: 'char',
      length: 200
    },
    ROL: {
      type: 'varchar2',
      length: 20
    }
  }
});

