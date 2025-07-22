import  e,{ Request, Response,NextFunction } from "express";
import { APIError } from "../errors/ApiError";
import{ UserModel} from "../models/user";


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        next(error);
    }
} 