var config = {
    server: {
      id: "environment",
      name: "xxx",
      host: "172.16.1.226",
      port: "3004",
      internalPort: "3004",
      protocol : "http",
      web_uri: "http://localhost"
    },
    logging : {
      level : 'debug', //Can be 'debug' , 'warn', 'info', 'error'
      loggers : {
        graylog : { type :'graylog' , host : '172.16.1.226' , port : 3004 },
        local : {type: 'local' }
      }
    },
    database: {
      client:'mysql',
      connection: {
        host:'localhost',
        port:'3306',
        user: 'root',
        password: 'toor',
        database: 'aesthetic_existing',
        charset: 'utf8'
      }
    },
    session: {
      secret: 'A Super Special And Fantastic Secret!'
    },
    webUri: 'http://xxxxxx',
    image_url:"http://xxxxx",
    image_path:"path toxxx/aesthetic_node/Upload/User/",
    image_path_global : "pathtoxxx/aesthetic_node/Upload/",
    web_name: "Asthetic",
    Authorkey : "Ak12mr27Xwg@d89ul"
};

module.exports = config;

