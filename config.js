// config.js
module.exports = {
    'routePath': __dirname + '/routes/',
    'controllerPath': __dirname + '/controllers/',
    'timezone': 'Asia/Kolkata',
    'databaseUri': 'mongodb://localhost:27017',
    // 'databaseUri': 'mongodb://172.17.0.3:27017',
    'databaseOptions': {
      dbName: 'task',
      authSource: 'task',
      autoReconnect: false,
      keepAlive: 1
    }
};