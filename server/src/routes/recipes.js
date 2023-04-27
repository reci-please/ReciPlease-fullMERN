import express from 'express';
import { PrismaClient } from '@prisma/client';
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
    
    // const {name, servings, instructions, imageUrl, cookingTime, authorId, ingredients, quantities, numIngredients} = req.body;
    try {

        // console.log("Name: " + name);
        // console.log("Servings: " + servings);
        // console.log("Instructions: " + instructions);
        // console.log("Image URL: " + imageUrl);
        // console.log("Cooking Time: " + cookingTime);
        // console.log("Author ID: " + authorId);
        // console.log("Ingredients: " + ingredients);
        // console.log("Quantities: " + quantities);
        // console.log("Number of Ingredients: " + numIngredients);

        const name = "Recipe1";
        const servings = 1;
        const instructions = "Instructions1";
        const imageUrl = "ImageURL1";
        const cookingTime = 1;
        const authorId = "1";
        const ingredients = ["Ingr1", "Ingr3", "Ingr2"];
        const quantities = ["11", "13", "23"];
        const numIngredients = 3;
        

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

        const allDRLabels = await prisma.DietaryRestrictionLabel.findMany({
            select: {
                name: true
            }
        });

        var recipeDRLabels = allDRLabels.map(label => label.name);

        console.log(recipeDRLabels);

        /* Create new ingredients if they don't exist, and add all ingredients to the recipe */
        for (let i = 0; i < numIngredients; i++) {
            const someIngredient = await prisma.ingredient.upsert({
                where: {
                    id: ingredients[i],
                },
                update: {
                },
                create: {
                    id: ingredients[i],
                },
            });

            const ingrLabelsQuery = await prisma.ingredient.findUnique({
                where: {
                    id: ingredients[i],
                },
                select: {
                    DRLabels: {
                        select: {
                            labelName: true,
                        },
                    },
                },
            })

            // console.log(ingrLabelsQuery);
            // console.log(typeof ingrLabelsQuery);

            var ingrDRLabels = ingrLabelsQuery.DRLabels.map(label => label.labelName);

            console.log("Ingr Labels: " + ingrDRLabels);
            // console.log("Ingr DR type: " + typeof ingrDRLabels);
            // console.log("Ingr DR Labels:");
            // for (let i = 0; i < ingrDRLabels.DRLabels.length; i++) {
            //     console.log(ingrDRLabels.DRLabels[i]);
            // }

            /* Filter out dietary restriction labels that are not in the ingredient */
            recipeDRLabels = ingrDRLabels.filter(value => recipeDRLabels.includes(value));
            console.log("Recipe Labels After: " + recipeDRLabels);
            //Object.values(ingrDRLabels).filter(value => recipeDRLabels.includes(value));

            /* Create ingredient - recipe relation */
            await prisma.ingredientsOnRecipes.create({
                data: {
                    recipeId: created.id,
                    ingredientId: someIngredient.id,
                    quantity: quantities[i],
                }
            })
        }

        console.log("Labels at end");
        for (let i = 0; i < recipeDRLabels.length; i++) {
            console.log(recipeDRLabels[i]);
        }

        /* Add dietary restriction labels to the recipe */
        for (let i = 0; i < recipeDRLabels.length; i++) {
            await prisma.DRLabelsOnRecipes.create({
                data: {
                    recipeId: created.id,
                    labelName: recipeDRLabels[i],
                }
            })
        }
        
        res.json({message: "Success"});

    } catch (err) { 
        res.json(err);
        console.log(err);
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
                },
                include: {
                    ingredients: true,
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