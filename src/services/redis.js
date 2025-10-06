import { createClient } from "redis";

// We use a client to interact with the redis server...
// Also remember that, whenever there exists a server - there exists a client.
// Why we need client ?...
// Cuz at the end of the day, redis is a server. So to interact with a server we obviously needs a client...

const redisClient = createClient(
    {
        url:"redis://localhost:6379" // on my local system
    }
)


redisClient.on("error", (err) => console.log("Redis Client Error", err));

// connection for the client...
await redisClient.connect();


// Now this is the instance of redis connection that you established with your redis-server...
export default redisClient;