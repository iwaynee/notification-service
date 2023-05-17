import express from "express";
import {createUser, deleteUser, updateUser} from "../controllers/user";

export const userRoutes = () => {
    const router = express.Router();

    // api/user/create
    router.post("/create", createUser)

    // api/user/update
    router.post("/update", updateUser)

    // api/user/delete
    router.delete("/delete", deleteUser)

    return router
}
