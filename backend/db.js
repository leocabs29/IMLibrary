const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: 'C:\\oraclexe\\instantclient_19_26' });

const dbConfig = {
  user: 'library_user',
  password: 'mypassword',
  connectString: 'localhost/XE'
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Successfully connected to Oracle Database!');
    return connection;
  } catch (err) { 
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

module.exports = {
  getConnection
};
