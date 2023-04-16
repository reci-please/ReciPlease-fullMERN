import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      },
      select: {
        username: true,
        recipes: {
          select: {
            name: true,
            imageUrl: true
          }
        }
      }
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export { router as profileRouter };
