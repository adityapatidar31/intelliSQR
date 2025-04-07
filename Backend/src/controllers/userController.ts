import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
