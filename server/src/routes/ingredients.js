import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './users.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => { 
    const { id, quantity } = req.body;
    try {
        await prisma.ingredient.create({
            id: id
        })
        res.json({message: "it worked"});

    } catch (err) {
        res.json(err);
    }
})

export {router as ingredientRouter}