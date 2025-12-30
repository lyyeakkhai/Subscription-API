// when ever program excute and there is an error it will be handle by this middleware
// what is middleware ?
// A middleware is code that runs in the middle of a process, between an input and a final result.
// In backend systems (like Express.js and Mongoose), middleware lets you intercept, inspect, modify, or stop the flow before it continues.
// Middleware = a function that runs between two steps and decides what happens next.

// How it works
// Request comes in → e.g., user wants to create a product
// Middleware executes first
// Validates the input
// Checks authentication / permissions
// Logs request or performs preprocessing
// Middleware decides:
// next() → continue to the controller / final operation
// next(error) → stop the operation, go to error handler
// Controller executes only if all middleware passed successfully
// Response sent → either success or error message

// Why this is important
// Prevents invalid data from reaching the database
// Catches errors early, avoiding inconsistent state
// Centralizes logic like authentication, logging, validation
// Keeps the client safe from incorrect or incomplete responses


// this is the form of the function that we need to create error middleware

const errorMiddleware = (err, req, res, next) => {

    try {
        let error = { ...err }; // copy the error object to avoid mutating the original

        error.message = err.message; // ensure the message property is set

        // Log the error for debugging
        console.error(err); 

        // Mongoose bad ObjectId
        if (err.name === "CastError") {
            const message = `Resource not found with id of ${err.value}`;
            error = new Error(message);
            error.statusCode = 404; // Not Found
        }

        // this is for handling mongoose duplicate key error
        if(err.code === 11000){
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400; // bad request
        }

        // mongoose validation error
        if(err.name === "ValidationError"){
            const messages = Object.values(err.errors).map(val => val.message);
            const message = `Invalid input data. ${messages.join(". ")}`;
            error = new Error(message.join(". "));
            error.statusCode = 400; // bad request
        }

        // send the error response
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error"
        });

    }catch(error){
        next(error);
    }

};

export default errorMiddleware;





