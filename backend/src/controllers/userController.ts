import { Request, Response } from "express";
import { getAllUsers, deleteUser } from "../services/userServices";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
