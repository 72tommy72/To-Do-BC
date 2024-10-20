import { UserModel } from "../../DB/models/user.model.js";
import { catchError } from "../utlis/catchError.js";

export const isAuthenticated = catchError(async(req, res, next)=>{
    // check if token is existence
    let {token} = req.headers['token']
    if(!token && !token.startWith(process.env.BEARER_TOKEN)){
        return next(new Error(" token is required or token must valid"));
    }
    //payload
    token = token.split(process.env.BEARER_TOKEN)[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) return next(new Error("invalid token")); 

    //check user
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return (new Error("User not found"));
    //pass user
    req.user = user;
    //return next
    return next();
});


