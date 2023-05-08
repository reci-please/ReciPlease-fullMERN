import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        const ingredients = req.body.formData;
        const requiredIngr = ingredients.required;
        const excludedIngr = ingredients.excluded;

        /* Check that required and excluded ingredients are arrays and both are not empty */
        if (!Array.isArray(requiredIngr) || !Array.isArray(excludedIngr)) {
            console.error("Error: Invalid search request- required ingredients or excluded ingredients is not an array.");
            return res.status(400).send("Error: Invalid search request- required ingredients or excluded ingredients is not an array.");
        } else if (requiredIngr.length === 0 && excludedIngr.length === 0) {
            console.error("Error: No ingredients passed.");
            return res.status(400).send("Error: No ingredients passed..");
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
        res.json(recipes);
    } catch(err) {
        console.error(err);
        res.json(err);
    }
});

router.post("/related", async (req, res) => {
    try {
        const ingredients = req.body.formData;
        const requiredIngr = ingredients.required;
        const excludedIngr = ingredients.excluded;

        /* Check that required and excluded ingredients are arrays and both are not empty */
        if (!Array.isArray(requiredIngr) || !Array.isArray(excludedIngr)) {
            console.error(
            "Error: Invalid search request- required ingredients or excluded ingredients is not an array."
        );
        return res
          .status(400)
          .send(
            "Error: Invalid search request- required ingredients or excluded ingredients is not an array."
        );
        } else if (requiredIngr.length === 0 && excludedIngr.length === 0) {
            console.error("Error: No ingredients passed.");
            return res.status(400).send("Error: No ingredients passed..");
        }
        const recipes = await prisma.recipe.findMany({
            where: {
                AND: requiredIngr.map(ingred => ({
                    ingredients: {
                        some: {
                            ingredientId: {
                                // check if any part of ingred is present in ingredientId
                                contains: ingred.toLowerCase()
                            }
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
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});
  
export { router as searchRouter };