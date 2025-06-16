import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // Initialize Redis from environment variables
    limiter: Ratelimit.slidingWindow(10, "15 s"), // 10 requests per 15 seconds
});

export default ratelimit;