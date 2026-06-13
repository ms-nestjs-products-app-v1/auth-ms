import 'dotenv/config';
import Joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  DATABASE_URL: string;
}

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.array().items(Joi.string()).required(),
  DATABASE_URL: Joi.string().required(),
}).unknown(true);

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
  databaseUrl: envsVars.DATABASE_URL,
};
