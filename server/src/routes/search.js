import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        const ingredients = req.body.formData;
        const requiredIngr = ingredients.seeking;
        const excludedIngr = ingredients.avoiding;

        /* Check that required and excluded ingredients are arrays and both are not empty */
        if (!Array.isArray(requiredIngr) || !Array.isArray(excludedIngr)) {
            console.log("Error: Invalid search request- required ingredients or excluded ingredients is not an array.");
            return res.status(400).send("Error: Invalid search request- required ingredients or excluded ingredients is not an array.");
        } else if (requiredIngr.length === 0) {
            console.log("Error: No wanted ingredients passed.");
            return res.status(400).send("Error: No wanted ingredients passed..");
        }

        const recipes = await prisma.recipe.findMany({
            where: {
                AND: requiredIngr.map(ingred => ({
                    ingredients: {
                        some: {
                            ingredientId: ingred
                        }
                    }
                })),
                NOT: {
                    ingredients: {
                        some: {
                            ingredientId: {
                                in: excludedIngr
                            }
                        }
                    }
                }
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