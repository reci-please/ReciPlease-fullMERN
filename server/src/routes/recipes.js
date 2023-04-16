import express from 'express';
import { PrismaClient } from '@prisma/client';
import mongoose, { connect } from 'mongoose';
//import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';




const router = express.Router();
const prisma = new PrismaClient();


router.post("/ingredientCreate", async (req, res) => {
    const { id, quantity} = req.body;
    try {
        const response = await prisma.ingredient.create({
            data: {
                id: id,
                quantity: quantity,
            }
        });
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})



router.get("/", async (req, res) => {
    try {
        const response = await prisma.recipe.findMany();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
     
    
    const {name, servings, instructions, imageUrl, cookingTime, authorId, ingredients, numIngredients} = req.body;
    try {

        
        const created = await prisma.recipe.create({
            data: {
                name: name,
                servings: servings,
                instructions: instructions,
                imageUrl: imageUrl,
                cookingTime: cookingTime,
                authorId: authorId
            }           
        });

        for (let i = 0; i < numIngredients; i++) { 
            const someIngredient = await prisma.ingredient.upsert({
                where: {
                    id: ingredients[i],
                },
                update: {
                    id: ingredients[i]
                },
                create: {
                    id: ingredients[i],
                    quantity: ""
                },
            });

            await prisma.ingredientsOnRecipes.create({
                data: {
                    recipeId: created.id,
                    ingredientId: someIngredient.id,
                }
            })

        }
        
        res.json({message: "success"});

    } catch (err) { 
        res.json(err);
    }
});

router.put("/saveRecipe/:savedById/:recipeId", async (req, res) => {
    try {
        const connection = await prisma.savedOnUsers.create({
            data: {
                savedById: req.params.savedById,
                recipeId: req.params.recipeId,
            }
        })
        res.json(connection);
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await prisma.savedOnUsers.findMany({
            where: {
                savedById: req.params.userID,
            }
        });
        let recipes = [];

        for (let i = 0; i < user.length; i++) {
            recipes.push(await prisma.recipe.findUnique({
                where: {
                    id: user[i].recipeId,
                }
            }))
        }

        res.json(recipes);
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.userID,
            },
            include: {
                savedRecipes: true,
            },
            
        });

        res.json(user.savedRecipes);
    } catch (err) {
        res.json(err);
    }
});


export { router as recipesRouter };

