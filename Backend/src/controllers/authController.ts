import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyPassword } from "../utils/helper";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Please Provide the Email and Password",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "Invalid Credentials",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "You are logged in successfully",
  });
};
