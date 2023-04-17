import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const { userName } = req.body;

  console.log("Inside router")
  console.log("Username inside router is ")
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: userName
      },
    });
    console.log("User found!")
    res.json(user);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export { router as profileRouter };
