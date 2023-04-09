import express from 'express';
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
//import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';


const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const response = await prisma.recipe.findMany();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const { name, servings, instructions, imageUrl, cookingTime, authorId} = req.body;
    try {
        const created = await prisma.recipe.create({
            data: {
                name: name,
                servings: servings,
                instructions: instructions,
                imageUrl: imageUrl,
                cookingTime: cookingTime,
                authorId: authorId,
            }           
        });

        res.json({message: "Recipe Created Successfully"});
    } catch (err) { 
        res.json({message: "cannot create recipe"});
    }
});

router.put("/", async (req, res) => {

    try { 
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: Number(req.body.recipeID),
            },
        });
        const user = await prisma.user.findUnique({
            where: {
                id: req.body.userID,
            }
        });
        
        user.savedRecipes.push(recipe);
        await user.save();

        res.json({ savedRecipes: user.savedRecipes });

    } catch (err) {
        res.json(err);
    }
    
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.userID,
            }
        })

        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.userID,
            }
        });

        const saved = await prisma.recipe.findUnique({
            where: {
                 id: savedRecipes
            }
        })

        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
            
        });
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err);
    }
});


export { router as recipesRouter };

/**
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {

    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.put("/", verifyToken, async (req, res) => {
    
    

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
            
        });
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err);
    }
});



export { router as recipesRouter };

*/