import express from 'express';
import  {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteManyUser,
} from "../controllers/User.controller.js";
 
const router = express.Router();
 
router.route("/").get(getAllUsers).delete(deleteManyUser).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
 
export default router;