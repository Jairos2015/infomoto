import express from 'express';
import  {
  getAllMotos,
  createMoto,
  listarMarcasMotos,
  getByBrandAll,
} from "../controllers/Moto.controller.js";
 
const router = express.Router();
 
router.route("/").get(getAllMotos).get(listarMarcasMotos).post(createMoto);
// router.route("/:id").get(getMotoById).put(updateMoto).delete(deleteMoto);
router.route("/listar").get(listarMarcasMotos) 
router.route("/listarpormarca").get(getByBrandAll)
export default router;
