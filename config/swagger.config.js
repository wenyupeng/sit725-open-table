const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "sit725-skipy",
      version: "1.0.0",
      description: `A website that imitates open table implementation`,
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // 默认应用 JWT 认证
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/**/**.js")], //Path to the API handle folder
};

module.exports = options;
