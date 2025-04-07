import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(401).json({
      status: "error",
      message: "user already exist",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  res.status(201).json({ user });
};
