import { Request, Response } from "express";
import prisma from "../lib/prisma";
import catchAsync from "../utils/catchAsync";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // TODO: Hash password later
  const user = await prisma.user.create({
    data: { email, password },
  });

  res.status(201).json({ user });
});
