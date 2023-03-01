import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      // console.log(token);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log({ payload });
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      if (
        user &&
        (user.role == "employee" ||
          user.role == "manager" ||
          user.role == "admin")
      ) {
        req.teamId = user.teamId;
      }
      req.user = user;
      req.addressId = user.addressId;
      req.role = user.role;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEducationLevel = (level: number) => {
  const levelsMap = [
    { 1: "Aucune education formal" },
    { 2: "Some primary education" },
    { 3: "CEP" },
    { 4: "Education Informel" },
    { 5: "BEPC" },
    { 6: "Bachelier" },
    { 7: "Un peu d'education universitaire ou Bac Pro" },
    { 8: "DEUG II" },
    { 9: "License Universitaire" },
    { 10: "2 Licenses ou 1 Master Universitaire" },
    { 11: "Doctorat Universitaire" },
  ];
  return levelsMap[level];
};
