import userService from '../services/User.service.js'; 
import pkg from 'jsonwebtoken';
const { sign, Secret, decode, verify } = pkg;
// const bcrypt = require("bcrypt");
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator';
export const getAllUsers = async (req, res) => {
  try {
    
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    // Create a User
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
      status: req.body.status | false
    };
    const userResult = await userService.createUser(user);
    res.json({ data: userResult, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteManyUser = async (req, res) => {
  try {
    const user = await userService.deleteMany({});
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}