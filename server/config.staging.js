module.exports = {
  restApiRoot: "/api",
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT,
  remoting :  {
    "context": {
      "enableHttpContext": false
    },
    "rest": {
      "normalizeHttpPath": false,
      "xml": false
    },
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "cors": false,
    "errorHandler": {
      "disableStackTrace": false
    }
  },
  legacyExplorer: false
};
