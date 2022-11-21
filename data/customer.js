const db = require('./db');

function getAll(callback){
    const sql = "SELECT id, name, email, age  FROM customer";
    db.executeQuery(sql,[],callback);
}


function addOne(name,email,age,callback){
    const sql = "INSERT INTO customer (name,email,age) VALUES (?,?,?)";
    db.executeQuery(sql, [name, email, age], callback);
}

module.exports.getAll = getAll;
module.exports.addOne = addOne;