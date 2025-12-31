import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // we need to let aarjet process the request and made a decision for the req
        const decision = await aj.protect(req, { request: 1 });

        // we need to check if the request is denied
        if(decision.isDenied()){
            //if it already denied we need to check the reason why denided
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    message: "Too many requests, please try again later."
                });
            }
            //then we need to check if its a bot
            if(decision.reason.isBot()){
                return res.status(403).json({
                    message: "Access denied for bots."
                });
            }
            if (decision.reason.isError()) {
                // Fail open by logging the error and continuing
                console.log("Arcjet error", decision.reason.message);
            }

            //if its other reason we just deny the request
            return res.status(403).json({
                message: "Access denied."
            });
        }

        // if everything is fine we call the next middleware
        next();

    } catch (error) {
        //we console.log the error and pass it to the next middleware
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }

}

export default arcjetMiddleware;
