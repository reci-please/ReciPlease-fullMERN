import express from "express";
import { PrismaClient } from '@prisma/client';

import cors from "cors";
import mongoose from "mongoose";
//import { userRouter } from "./routes/users.js";
//import { recipesRouter } from "./routes/recipes.js";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
app.use(cors());



//app.use("/auth", userRouter);
//app.use("/recipes", recipesRouter);



//mongoose.connect("mongodb+srv://officialreciplease:WpYgE1Qxf9nJn7ic@reciplease.gayiyzz.mongodb.net/test");

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });
    res.json(user);
});

app.get("/", async (req, res) => { 
    const users = await prisma.user.findMany();
    res.json(users);
});

app.get("/byId/:id", async (req, res) => { 
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(user);
});

app.put("/", async (req, res) => {
    const { id, username } = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username,
        },
    });
    res.json(updatedUser)
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(deletedUser);
 });

app.listen(3001, () => { 
    console.log("SERVER RUNNING ON PORT 3001");
})

