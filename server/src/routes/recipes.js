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

router.get("/recipeId/:id", async (req, res) => { 

    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: req.params.id,
            }, include: {
                ingredients: true,
            }
        })
        res.json(recipe);
    } catch (err) {
        res.json(err);
    }
})

//deletes recipes
router.delete("/:id", async (req, res) => {
    //id of recipe to be deleted
    const id = req.params.id;
    //const { ingredients, numIngredients } = req.body;

    // deletes all relations that associate ingredients with recipe to be deleted
    await prisma.ingredientsOnRecipes.deleteMany({
        where: {
            recipeId: {
                contains: id,
            }
        }
    });


    // finally deletes the actual recipe from the database now that there is no more relations
    await prisma.recipe.delete({
        where: {
            id: id,
        },
    });

    
    res.json({message: "success"});

 });

 // creates a recipe from scratch
router.post("/", async (req, res) => {
    
    const {name, servings, instructions, imageUrl, cookingTime, authorId, ingredients, quantities, numIngredients} = req.body;
    try {

        
        const created = await prisma.recipe.create({
            data: {
                name: name,
                servings: servings,
                instructions: instructions,
                imageUrl: imageUrl,
                cookingTime: cookingTime,
                skillLvl: "low",
                avgScore: 0,
                totalScore: 0,
                numReview: 0,
                authorId: authorId
            }           
        });


        for (let i = 0; i < numIngredients; i++) {
            const someIngredient = await prisma.ingredient.upsert({
                where: {
                    id: ingredients[i].toLowerCase(),
                },
                update: {
                },
                create: {
                    id: ingredients[i].toLowerCase(),
                },
            });


            await prisma.ingredientsOnRecipes.create({
                data: {
                    recipeId: created.id,
                    ingredientId: someIngredient.id,
                    quantity: quantities[i],
                }
            })

        }
        
        res.json({message: "success"});

    } catch (err) { 
        res.json(err);
    }
});



// saves a recipe to a user by creating a relation between the two
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


// gets recipes saved by a particular user
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

// CRUD for reviews

router.post("/review", async (req, res) => {

    const { reviewedById, recipeId, score, fullReview } = req.body;

    try {

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId,
            }
        })
        
        const review = await prisma.recipeReviews.create({
            data: {
                reviewedById: reviewedById,
                recipeId: recipeId,
                score: score,
                review: fullReview,
            }
        });

        let newTotal = recipe.totalScore + score;
        let newNumPeople = recipe.numReview + 1;

        console.log(newTotal);
        console.log(newNumPeople);

        const newRecipe = await prisma.recipe.update({
            where: {
                id: recipeId,
            }, 
            data: {
                totalScore: newTotal,
                numReview: newNumPeople,
                avgScore: (newTotal/newNumPeople),
            }
        })

        console.log(newRecipe);

        res.json({ message: "new review created" });
    } catch (err) { 
        res.json(err);
    }

});

router.put("/review", async (req, res) => {
    const { reviewedById, recipeId, score, fullReview } = req.body;

    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId,
            }
        })
    
        const oldReview = await prisma.recipeReviews.findUnique({
            where: {
                reviewedById_recipeId: {
                    reviewedById: reviewedById,
                    recipeId: recipeId,
                }
            }
        })
    
        let newTotalScore = recipe.totalScore - oldReview.score + score;
    
        await prisma.recipe.update({
            where: {
                id: recipeId,
            },
            data: {
                totalScore: newTotalScore,
                avgScore: (newTotalScore/recipe.numReview),
            }
        })
    
        const review = await prisma.recipeReviews.update({
            where: {
                reviewedById_recipeId: {
                    reviewedById: reviewedById,
                    recipeId: recipeId,
                }
            }, data: {
                score: score,
                review: fullReview,
            },
        });

        res.json({ message: "updated review" });
    } catch (err) {
        res.json(err);
    }

    


})

router.get("/review/:recipeID", async (req, res) => {
    try {
        const reviews = await prisma.recipeReviews.findMany({
            where: { recipeId: req.params.recipeID, },
            orderBy: {createdAt: 'desc'}
        });

        res.json(reviews);
    } catch (err) {
        res.json(err);
    }
})

router.delete("/review", async (req, res) => {
    try {
        await prisma.recipeReviews.delete({
            where: {
                recipeId: "6e4a13c9-d161-4c86-85e2-8be4f2c06372",
            }
        });
        res.json({ message: "deleted all reviews" })
    } catch (err) {
        res.json(err);
    }
});




export { router as recipesRouter };