import { createClient, type RedisClientType } from "redis";

const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

if (!redisPassword || !redisHost || !redisPort) {
  throw Error("Error connecting to redis client.");
}

const client: RedisClientType = createClient({
  username: "default",
  password: redisPassword,
  socket: {
    host: redisHost,
    port: parseInt(redisPort, 10),
  },
});

client.on("error", err => console.log("Redis Client Error", err));
client.on("connect", () =>
  console.log("Node-Redis Client: Attempting to connect...")
);
client.on("ready", () =>
  console.log("Node-Redis Client: Connected and ready!")
);
client.on("end", () => console.log("Node-Redis Client: Connection ended."));
client.on("reconnecting", () =>
  console.warn("Node-Redis Client: Reconnecting...")
);

if (!client.isOpen) {
  await client.connect();
}

export { client as kv };
