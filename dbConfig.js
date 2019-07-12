///npm i -g  --msvs_version=2017 oracle/node-oracledb#v3.1.2
const test= {
  type: "oracle",
  username: 'test',
  password: 'nomelase',
  connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))(CONNECT_DATA=(SID=XE)))',  
  synchronize: false,
  logging: false,
  entities: [
      "./entity/*.js"    
  ]
};


module.exports = {
  test
}