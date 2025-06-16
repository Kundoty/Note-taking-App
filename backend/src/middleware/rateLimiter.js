import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit('my-rate-limit');
        if (!success) {
            return res.status(429).json({message: "Too many requests, please try again later."});
        }
        next(); // Call next middleware or route handler if the request is within the limit
    } catch (error) {
        console.log("Rate limiter error:", error);
        next(error); // Pass the error to the next middleware for handling
    }
}

export default rateLimiter;