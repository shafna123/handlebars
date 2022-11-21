const mysql = require('mysql2');

const connectionDetails = {
    host: 'localhost',
    user: 'root',
    password: 'Shafsam@11',
    database: 'experion'
}
let success = mysql.createConnection(connectionDetails)
success.connect((err)=>{
  if(err){
    console.log(err)
  }
  else{
    
    console.log("Connected successfully")
  }
})
function getConnection(){
    return mysql.createConnection(connectionDetails);
}

function executeQuery(query, parameters,callback){
  let connection = getConnection();
  connection.connect();
  connection.query(query,parameters,callback);
  connection.end();

}
module.exports.executeQuery = executeQuery;