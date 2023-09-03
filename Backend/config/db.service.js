const neo4j = require('neo4j-driver');
const uri = 'neo4j+s://b9aa2fa9.databases.neo4j.io';
const user = 'neo4j';
const password = 'izqlK5JYaE_pPJfKxi2jfN4QYbfyMPzVNX6ycyV0tMs';

const driver =  neo4j.driver(uri, neo4j.auth.basic(user, password));
      
module.exports = getDriver; 
        
function getDriver() {
    return driver;
  }


