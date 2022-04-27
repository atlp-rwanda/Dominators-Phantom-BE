// import express from "express";
import { Router } from 'express';
const router = Router();
// import Users from "../controllers/usersController";
import { addUser, allUsers, findOneUser, update, deleteUser} from '../controllers/usersController'



// const router = express.Router();

// get all users
router.get("/api/v1/users", allUsers);

// get one user
router.get("/api/v1/users/:id", findOneUser);

// create user
router.post("/api/v1/users", addUser);

// update user by id
router.put("/api/v1/users/:id", update);

// delete user by id
router.delete("/api/v1/users/:id", deleteUser);

export const userRouter = router;
