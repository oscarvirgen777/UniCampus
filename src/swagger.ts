import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "UniCampus API",
    description: "API para gestión ",
  },
  host: "localhost:3000",
  basePath: "/api",
};

const outputFile = "./swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);   