import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyPassword } from "../utils/helper";
import { hashPassword } from "../utils/helper";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError("Please Provide the Email and Password", 400));
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      next(new AppError("Invalid Credentials", 400));
      return;
    }

    res.status(200).json({
      status: "success",
      message: "You are logged in successfully",
    });
  }
);

export const signUpUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      next(new AppError("User already exist", 400));
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ user });
  }
);
