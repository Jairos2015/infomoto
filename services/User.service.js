import UserModel from "../models/user.js";
const userService = {}; 
userService.getAllUsers = async () => {
  return await UserModel.find();
};
 
userService.createUser = async (user) => {
  return await UserModel.create(user);
};
userService.getUserById = async (id) => {
  return await UserModel.findById(id);
};
 
userService.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};
 
userService.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

userService.deleteMany = async () => {
  return await UserModel.deleteMany({});
}
export default userService;