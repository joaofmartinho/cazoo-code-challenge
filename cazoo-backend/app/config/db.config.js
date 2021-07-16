module.exports = {
  url: process.env.DB_URI
    ? process.env.DB_URI
    : 'mongodb://root:toor@localhost:27017/cazoo-database?authSource=admin&authMechanism=SCRAM-SHA-1'
};
