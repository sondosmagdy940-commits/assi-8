import { deleteUser, getUser, loggin, signup, update } from "./users.service.js";

export const createUser = async (req, res, next) => {
    try {
        const newUser = await signup(req.body);
        res.status(201).json({
            message: " created successfully",
            success: true,
            data: newUser
        });

    } catch (err) {
        next(err)
    }
}
export const Loggin = async (req, res, next) => {
    try {
        const {email, Password} = req.body
        const user = await loggin(email,Password);
        res.status(201).json({
            message: "Logged in successfully",
            success: true,
            data: user
        });

    } catch (err) {
        next(err)
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { password, Password, ...restOfData } =req.body;
        const {id} = req.params
        const user = await update(id,restOfData);
        res.status(201).json({
            message: "User updated",
            success: true,
            data: user
        });

    } catch (err) {
        next(err)
    }
}

export const deletedUser = async (req, res, next) => {
    try {
        const {id}= req.params;
        const user = await deleteUser(id);
        res.status(201).json({
            message: "User deleted",
            success: true,
            data: user
        });

    } catch (err) {
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const {id}= req.params;
        const user = await getUser(id);
        res.status(201).json({
            success: true,
            data: user
        });

    } catch (err) {
        next(err)
    }
}
