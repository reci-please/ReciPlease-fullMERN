import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        const ingr = req.body.ingredients;

        //const { query, ingredients } = req.body;
        // Note: when adding more filters/search terms, can add as follows:
        // const { query, ingredients, exclusions } = req.body;

        /* Check that something is passed */
        // if (!query && (Array.isArray(ingredients) || ingredients.length == 0)) {
        //     return res.status(400).send('Invalid search request');
        // }

        /* Check that ingredients array is not null or empty */
        if (!Array.isArray(ingr)) {
            console.log("Error: Invalid search request- ingredients is not an array");
            return res.status(400).send("Error: Invalid search request- ingredients is not an array");
        } else if (ingr.length == 0) {
            console.log("Error: Invalid search request- ingredients array is empty");
            return res.status(400).send("Error: Invalid search request- ingredients array is empty");
        }

        const recipes = await prisma.recipe.findMany({
            where: {
                AND: ingr.map(ingred => ({
                    ingredients: {
                        some: {
                            ingredientId: ingred
                        }
                    }
                }))
            },
            select: {
                id: true,
                name: true,
                servings: true,
                instructions: true,
                imageUrl: true,
                cookingTime: true,
                ingredients: {
                    select: {
                        ingredientId: true,
                        quantity: true,
                    },
                },
            }
        });

        // const result = recipes.map((recipe) => {
        //     return { ...recipe, ingredients: recipe.ingredients.map((ingred) => ingred.ingredientId) }
        // })

        console.log("Results:");
        recipes.forEach((rec) => {
            console.log("Recipe: " + rec);
            console.log("Recipe Stringify: " + JSON.stringify(rec));
        })

        res.json(recipes);

    } catch(err) {
        console.error(err);
        res.json(err);
    }
});

export { router as searchRouter };