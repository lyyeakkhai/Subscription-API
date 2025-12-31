import Subscription from "../model/subscription.model.js";


export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            data: subscription
        });

    } catch(e){
        next(e);
    }
    
}

export const getSubscription = async (req, res, next) => {

    try {
        
        // we first cheeck the user id is the same as param id  why because  if user id in the token is same as param id then only we can get the subscriptions
        if(req.user.id !== req.params.id){
            const error = new Error("Unauthorized access to subscriptions");
            error.statusCode = 401;
            throw error;
        }
        // user: req.user._id  the user id for subscriptions we assign when we create subscription
        const subscriptions = await Subscription.find({ user: req.params._id });
        
        console.log(subscriptions);
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }

}

export const getSubscriptions = async (req, res, next) => {

    try {

        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (error) {
        next(error);
    }

}