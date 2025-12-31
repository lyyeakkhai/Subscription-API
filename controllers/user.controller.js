import User from "../model/user.model.js";


export const getUsers = async (rep, res, next) => {
    try{
        // we try to get all user from database
        const users = await User.find();

        res.status(200).json(
            {
                success: true,
                udata:users
            }
        );
    } catch(error){
        next(error);

    }
}

export const getUser = async (rep, res, next) => {
    try{
        // we try to get all user from database
        const user = await User.findById(rep.params.id);
        if(!user){
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json(
            {
                success: true,
                data:user
            }
        );
    } catch(error){
        next(error);

    }
}

