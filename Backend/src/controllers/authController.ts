import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { verifyPassword } from "../utils/helper";
import { hashPassword } from "../utils/helper";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { emailOnlySchema } from "../validation/authSchema";

interface User {
  email: string;
  password: string;
  id: string;
}

function signToken(id: string): string {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined in environment");
  }

  return jwt.sign({ id }, secret, {
    expiresIn: parseInt(expiresIn, 10),
  });
}

const createSendToken = (user: User, statusCode: number, res: Response) => {
  const token = signToken(user.id);

  const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none" as const,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = "prevent password from leaking";

  const message =
    statusCode === 201
      ? "Account created successfully"
      : "You are logged in successfully";
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    user,
  });
};

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

    createSendToken(user, 200, res);
  }
);

export const signUpUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      next(
        new AppError("Email, Password and confirm Password is required", 400)
      );
      return;
    }

    if (password !== confirmPassword) {
      next(new AppError("Password and confirm Password are not matching", 400));
      return;
    }

    const parsed = emailOnlySchema.safeParse({ email });
    if (!parsed.success) {
      const message = parsed.error.errors[0].message;
      return next(new AppError(message, 400));
    }

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

    createSendToken(user, 201, res);
  }
);
