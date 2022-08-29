'use strict';
import "dotenv/config";
import express from 'express';
import  {
  getWhatsapp,
  postWhatsapp,
} from "../controllers/Whatsapp.controller.js";
 
const router = express.Router();
 
router.route("/").get(getWhatsapp).post(postWhatsapp);

 
export default router;

