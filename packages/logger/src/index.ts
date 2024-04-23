import pino, { destination } from "pino";

export const name = "logger";
const pretty = require("pino-pretty");

const stream = pretty({
  colorize: true,
});

export const logger = pino(stream);
