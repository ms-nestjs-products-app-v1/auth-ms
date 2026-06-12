import 'dotenv/config';
import Joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.array().items(Joi.string()).required(),
}).unknown(true);

console.log(process.env);
const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config validation error: ${error.message}}`);
}

// const envsVars: EnvVars = value;
const envsVars = value as EnvVars;

export const envs = {
  port: envsVars.PORT,
  nastsServers: envsVars.NATS_SERVERS,
};
