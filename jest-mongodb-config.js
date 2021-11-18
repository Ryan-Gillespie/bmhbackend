// https://github.com/shelfio/jest-mongodb#2-create-jest-mongodb-configjs
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    instance: {
        dbName: 'jest',
    },
    autoStart: false,
    instance: {},
  },
};
